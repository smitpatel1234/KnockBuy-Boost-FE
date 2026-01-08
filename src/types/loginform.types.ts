import type { FormikProps } from 'formik'
import type { LoginCredentials } from '@/types/auth.types'
import type React from 'react'

export interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  disabled?: boolean
  formik: FormikProps<LoginCredentials>
  error: string | null
  loading: boolean
  data: boolean
  color?: string
}
