'use client';

import React, { useState, useCallback } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import type { FilterSidebarProps } from '@/types/filter.types';

const RATINGS: number[] = [4, 3, 2, 1];

export default function FilterSidebar({ onFilterChange, dynamicOptions, constraints = [] }: FilterSidebarProps & { constraints?: any[] }): React.ReactElement {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRating, setSelectedRating] = useState<string>('0');
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string[] }>({});

  const variantProperties = dynamicOptions?.variantProperties || {};

  React.useEffect(() => {
    if (constraints && constraints.length > 0) {
      const priceConstraint = constraints.find((c: any) => c.column === 'item.item_price');
      if (priceConstraint) {
        setPriceRange([Number(priceConstraint.min), Number(priceConstraint.max)]);
      }
    }
  }, [constraints]);

  React.useEffect(() => {
    onFilterChange?.({
      priceRange,
      selectedRating,
      selectedColors: [],
      selectedSizes: [],
      selectedVariants,
      search: '',
      sortBy: 'newest'
    });
  }, [priceRange, selectedRating, selectedVariants, onFilterChange]);

  const handleVariantChange = useCallback((propertyName: string, value: string, checked: boolean | string): void => {
    setSelectedVariants((prev: { [key: string]: string[] }): { [key: string]: string[] } => {
      const isChecked = typeof checked === 'boolean' ? checked : false;
      const currentValues = prev[propertyName] || [];
      
      if (isChecked) {
        return {
          ...prev,
          [propertyName]: [...currentValues, value]
        };
      } else {
        return {
          ...prev,
          [propertyName]: currentValues.filter((v: string) => v !== value)
        };
      }
    });
  }, []);

  const handlePriceChange = useCallback((value: number[]): void => {
    setPriceRange([value[0], value[1]] as [number, number]);
  }, []);

  const handleRatingChange = useCallback((value: string): void => {
    setSelectedRating(value);
  }, []);

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Price Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold mb-3 hover:underline">
          <span>Price</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div>
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={500}
              step={5}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${String(priceRange[0])}</span>
              <span>${String(priceRange[1])}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-4 mb-4" />

      {/* Rating Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold mb-3 hover:underline">
          <span>Customer Review</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <RadioGroup value={selectedRating} onValueChange={handleRatingChange}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="0" id="r0" />
              <Label htmlFor="r0" className="cursor-pointer">All Ratings</Label>
            </div>
            {RATINGS.map((rating: number) => (
              <div key={rating} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={rating.toString()} id={`r${String(rating)}`} />
                <Label htmlFor={`r${String(rating)}`} className="flex items-center cursor-pointer">
                  {Array.from({ length: rating }).map((_, i: number) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i: number) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                  <span className="ml-2">& Up</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t pt-4 mb-4" />

      {/* Dynamic Variant Filters */}
      {Object.entries(variantProperties).map(([propertyName, values]) => (
        <React.Fragment key={propertyName}>
          <Collapsible defaultOpen className="mb-4">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold mb-3 hover:underline capitalize">
              <span>{propertyName}</span>
              <ChevronDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {(values as string[]).map((value: string) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`variant-${propertyName}-${value}`}
                    checked={(selectedVariants[propertyName] || []).includes(value)}
                    onCheckedChange={(checked: boolean | string) => {
                      handleVariantChange(propertyName, value, checked);
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
    </div>
  );
}