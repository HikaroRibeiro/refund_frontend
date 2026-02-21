/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { z, ZodError } from 'zod'
import { AxiosError } from 'axios'
import { api } from '../services/api'

const signUpSchema = z
  .object({
    name: z.string().min(3, 'O nome deve conter no mínimo 3 caracteres.'),
    email: z.email('Digite um e-mail válido.'),
    password: z
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres.')
      .regex(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        'A senha deve conter pelo menos uma letra maiúscula e um número.',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem.',
    path: ['passwordConfirm'],
  })

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function onSubmit(e: React.ChangeEvent) {
    e.preventDefault()
    try {
      setIsLoading(true)

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      })

      await api.post('/users', data)

      if (confirm('Usuário cadastrado com sucesso! Deseja fazer login?')) {
        navigate('/')
      }
    } catch (error) {
      if (error instanceof ZodError) {
        alert(error.issues.map((err) => err.message).join('\n'))
      }
      if (error instanceof AxiosError) {
        alert(error.response?.data.message || 'Erro ao cadastrar usuário.')
      }
    } finally {
      setIsLoading(false)
    }
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
