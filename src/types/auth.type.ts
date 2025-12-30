export interface LoginCredentials {
  identifier: string | number
  password: string
}

export interface UsernameAsIdentifier {
  username: string
}

export interface PhoneNumberAsIdentifier {
  phone_number: number
}

export interface EmailAsIdentifier {
  email: string
}

export interface RegisterCredentials {
  username: string
  phone_number: number
  email: string
  password: string
}

export interface AuthUser {
  id: string
  Username: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
}

export interface UserProfile extends AuthUser {
  phone?: string
  addresses?: Address[]
  preferences?: UserPreferences
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  newsletter: boolean
  notifications: boolean
  twoFactorAuth: boolean
}