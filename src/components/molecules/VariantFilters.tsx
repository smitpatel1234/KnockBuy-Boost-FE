'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface VariantFiltersProps {
  variantProperties: Record<string, string[]>;
  selectedVariants: Record<string, string[]>;
  onVariantChange: (propertyName: string, value: string, checked: boolean | string) => void;
}

export function VariantFilters({
  variantProperties,
  selectedVariants,
  onVariantChange,
}: Readonly<VariantFiltersProps>): React.ReactElement {
  return (
    <>
      {Object.entries(variantProperties).map(([propertyName, values]) => (
        <React.Fragment key={propertyName}>
          <Collapsible defaultOpen className="mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold mb-3 hover:underline capitalize">
              <span>{propertyName}</span>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {values.map((value: string) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`variant-${propertyName}-${value}`}
                    checked={(selectedVariants[propertyName] ?? []).includes(value)}
                    onCheckedChange={(checked: boolean | string) => {
                      onVariantChange(propertyName, value, checked);
                    }}
                  />
                  <Label htmlFor={`variant-${propertyName}-${value}`} className="cursor-pointer capitalize">
                    {value}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
          <div className="border-t pt-4 mb-4" />
        </React.Fragment>
      ))}

      {Object.keys(variantProperties).length === 0 && (
        <div className="text-sm text-gray-500 italic">
          No variant filters available for selected products
        </div>
      )}
    </>
  );
}
