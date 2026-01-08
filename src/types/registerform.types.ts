import type { RegisterCredentials } from '@/types/auth.types'

export interface RegisterFormValues extends RegisterCredentials {
  confirmPassword: string
  agreeToTerms: boolean
}

export interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  isLoading?: boolean
  error?: string
}

export interface UsePasswordStrengthResult {
  passwordStrength: (password: string) => number
  strengthColor: (level: number) => string
}

export function usePasswordStrength(): UsePasswordStrengthResult {
  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strengthColor = (level: number) => {
    if (level <= 1) return 'bg-red-500'
    if (level === 2) return 'bg-yellow-500'
    if (level === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  return { passwordStrength, strengthColor }
}
