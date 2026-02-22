import logoSvg from '../assets/logo.svg'
import logoutSvg from '../assets/logout.svg'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const auth = useAuth()

  return (
    <header className="w-full flex justify-between">
      <img src={logoSvg} className="my-8" alt="Ícone de Logon" />
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-200">
          Olá, {auth.session?.user.name}
        </span>
        <img
          onClick={() => auth.logout()}
          src={logoutSvg}
          className="my-8 cursor-pointer hover:opacity-75 transition: ease-linear"
          alt="Ícone de logout"
        />
      </div>
    </header>
  )
}
