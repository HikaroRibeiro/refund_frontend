import { useState } from 'react'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'
import { Upload } from '../components/Upload'
import { Button } from '../components/Button'
import { useNavigate, useParams } from 'react-router'
import { z, ZodError } from 'zod'
import { api } from '../services/api'
import fileSvg from '../assets/file.svg'
import { AxiosError } from 'axios'

const refundsSchema = z.object({
  name: z.string().min(3, 'O nome deve conter no mínimo 3 caracteres.'),
  amount: z
    .number({ message: 'O valor deve ser um número válido.' })
    .positive({ message: 'O valor deve ser positivo.' }),
  category: z.enum(CATEGORIES_KEYS, { message: 'Categoria inválida.' }),
})

export default function Refunds() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams<{ id: string }>()

  async function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
    if (params.id) {
      return navigate(-1)
    }
    try {
      setIsLoading(true)

      if (!file) {
        return alert('Por favor, envie um comprovante.')
      }

      const fileUploadForm = new FormData()
      fileUploadForm.append('file', file)

      const response = await api.post('/uploads', fileUploadForm, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const refunds = refundsSchema.safeParse({
        name,
        amount: Number(amount.replace(',', '.')),
        category,
      })

      await api.post('/refunds', {
        ...refunds.data,
        filename: response.data.filename,
      })
      // Inserindo na navegação, que ela vem de um "Submit".
      console.log(refunds)
      navigate('/confirm', { state: { fromSubmit: true } })
    } catch (error) {
      if (error instanceof ZodError) {
        return alert({
          message: error.issues.map((issue) => issue.message).join('\n'),
        })
      }
      if (error instanceof AxiosError) {
        return alert(
          error.response?.data?.message ||
            'Ocorreu um erro ao enviar a solicitação.',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form
      action="#"
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 mx-auto max-w-md md:min-w-lg"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.
        </p>
      </header>
      <Input
        required
        legend="Nome da solicitação."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>
        <Input
          required
          legend="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>
      {params.id ? (
        <a
          href="https://www.rocketseat.com.br/"
          target="_blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
          rel="noreferrer"
        >
          <img src={fileSvg} alt="Ícone de arquivo" /> Abrir comprovante{' '}
        </a>
      ) : (
        <Upload
          legend="Comprovante"
          type="file"
          filename={file && file.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
      )}
      <Button type="submit" isLoading={isLoading}>
        {params.id ? 'Voltar' : 'Enviar'}
      </Button>
    </form>
  )
}
