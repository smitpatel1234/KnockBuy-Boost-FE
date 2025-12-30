import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import  {Combobox } from "@/components/molecules/Combobox";

export default function UserAddressItem() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Address</span>
          <span className="text-xs text-muted-foreground">
            Address #1
          </span>
        </div>

        {/* Address Lines */}
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">Address Line 1</Label>
            <Input
              className="h-8 text-sm"
              placeholder="House no, street, area"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Address Line 2</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Landmark, building (optional)"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">City</Label>
            <Combobox name="city" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">State</Label>
            <Combobox name="state" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Country</Label>
            <Combobox name="country" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Pincode</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Postal code"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
