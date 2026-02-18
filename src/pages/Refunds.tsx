/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'
import { Upload } from '../components/Upload'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router'

export default function Refunds() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filename, setFilename] = useState<File | null>(null)

  const navigate = useNavigate()

  function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
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
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        />
      </div>
      <Upload
        legend="Comprovante"
        type="file"
        filename={filename && filename.name}
        onChange={(e) => e.target.files && setFilename(e.target.files[0])}
      />
      <Button type="submit" isLoading={isLoading}>
        Enviar
      </Button>
    </form>
  )
}
