import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { UserProfile } from '@/types/auth.types'

interface ProfileBasicInfoProps {
  profile: UserProfile
  isEditing: boolean
  onChange?: (field: string, value: string) => void
}


export default function ProfileBasicInfo({
  profile,
  isEditing,
  onChange,
}: ProfileBasicInfoProps) {
  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">UserName </p>
            <p className="text-sm font-medium text-gray-900">{profile.username}</p>
          </div>

        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
          <p className="text-sm font-medium text-gray-900">{profile.email}</p>
        </div>
        {profile.phone && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
            <p className="text-sm font-medium text-gray-900">{profile.phone}</p>
          </div>
        )}
      </div>
    )
  }

  return (

    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
          UserName
        </Label>
        <Input
          id="firstName"
          value={profile.username}
          onChange={(e) => onChange?.('firstName', e.target.value)}
        />
      </div>



      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          disabled
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-500">Email cannot be changed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={profile.phone ?? ''}
          onChange={(e) => onChange?.('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </div>
  )
}
