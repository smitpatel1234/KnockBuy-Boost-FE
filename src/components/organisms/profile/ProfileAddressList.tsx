import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2 } from 'lucide-react'
import { Address } from '@/types/auth.type'

interface ProfileAddressListProps {
  addresses: Address[]
  onAdd?: () => void
  onEdit?: (address: Address) => void
  onDelete?: (id: string) => void
}

/**
 * ProfileAddressList Molecule
 * Displays user's saved addresses with edit/delete options
 * 
 * Responsibility:
 * - Show all saved addresses
 * - Highlight default address
 * - Allow adding new addresses
 * - Allow editing existing addresses
 * - Allow deleting addresses
 */
export default function ProfileAddressList({
  addresses,
  onAdd,
  onEdit,
  onDelete,
}: ProfileAddressListProps) {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600 mb-4">No addresses added yet</p>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">{address.label}</h4>
              {address.isDefault && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  Default
                </Badge>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(address)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(address.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                ×
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {address.street}
          </p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-sm text-gray-600">
            {address.country}
          </p>
        </div>
      ))}

      <Button
        onClick={onAdd}
        variant="outline"
        className="w-full gap-2 mt-4"
      >
        <Plus className="w-4 h-4" />
        Add Another Address
      </Button>
    </div>
  )
}
