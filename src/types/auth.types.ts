export interface LoginCredentials {
  identifier: string | number
  password: string
  role: string
  recaptchaToken?: string |null;
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
  phone_number: string
  email: string
  password: string
}

export interface AuthUser {
  user_id?: string
  username?: string
  phone_number?: string
  email?: string
  wishlist_name?: string
  profile_image?: string

}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
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