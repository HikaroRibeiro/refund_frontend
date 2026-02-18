/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
    console.log(name, email, password, passwordConfirm)
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        required
        legend="Nome"
        placeholder="Digite seu nome."
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        required
        legend="E-mail"
        placeholder="Digite seu e-mail."
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        required
        legend="Senha"
        placeholder="Digite uma senha."
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        required
        legend="Confirmação da Senha"
        placeholder="Digite novamente sua senha."
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>
      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-6 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta!
      </a>
    </form>
  )
}
