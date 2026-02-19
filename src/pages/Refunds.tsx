/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'
import { Upload } from '../components/Upload'
import { Button } from '../components/Button'
import { useNavigate, useParams } from 'react-router'
import fileSvg from '../assets/file.svg'

export default function Refunds() {
  const [name, setName] = useState('Teste')
  const [amount, setAmount] = useState('34')
  const [category, setCategory] = useState('transport')
  const [isLoading, setIsLoading] = useState(false)
  const [filename, setFilename] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams<{ id: string }>()

  function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
    if (params.id) {
      return navigate(-1)
    }
    // Inserindo na navegação, que ela vem de um "Submit".
    navigate('/confirm', { state: { fromSubmit: true } })
    console.log({ name, amount, category }, filename)
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
          filename={filename && filename.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
      )}
      <Button type="submit" isLoading={isLoading}>
        {params.id ? 'Voltar' : 'Enviar'}
      </Button>
    </form>
  )
}
