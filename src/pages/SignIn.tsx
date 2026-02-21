/* eslint-disable @typescript-eslint/no-unused-vars */
import { useActionState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { z } from 'zod'
import { api } from '../services/api'
import { AxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'

const signInSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(4, { message: 'Senha inválida' }),
})

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null)
  const auth = useAuth()

  async function signIn(prevState: unknown, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      })

      const response = await api.post('/sessions', data)

      auth.save(response.data)
      console.log('Login bem-sucedido:', response.data)
      // Aqui você pode chamar sua API de autenticação com os dados validados
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('ZodErro')
        return {
          message: error.issues.map((issue) => issue.message).join('\n'),
        }
      }

      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.message || 'Erro ao fazer login.',
        }
      }
      return { message: 'Ocorreu um erro desconhecido.' }
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" action={formAction}>
      <Input
        name="email"
        type="email"
        required
        legend="E-mail"
        placeholder="Digite seu e-mail"
        // onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        name="password"
        type="password"
        required
        legend="Senha"
        placeholder="Digite sua senha"
        // onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-sm text-red-500 text-center my-4 font-medium">
        {state?.message}
      </p>

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
