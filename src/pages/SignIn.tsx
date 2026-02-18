/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        type="email"
        required
        legend="E-mail"
        placeholder="Digite seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        required
        legend="Senha"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>
      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-6 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  )
}
