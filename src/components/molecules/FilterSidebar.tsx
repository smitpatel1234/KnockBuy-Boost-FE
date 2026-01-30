'use client';

import React, { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import type { FilterSidebarProps } from '@/types/filter.types';
import { RatingFilter } from './RatingFilter';
import { VariantFilters } from './VariantFilters';
import type { MaxMinConstraints } from '@/types/pagination.types';

export default function FilterSidebar({ onFilterChange, dynamicOptions, constraints  }: FilterSidebarProps & { constraints: MaxMinConstraints[] }): React.ReactElement {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedRating, setSelectedRating] = useState<string>('0');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string[]>>({});

  const variantProperties = dynamicOptions?.variantProperties ?? {};

  React.useEffect(() => {
    if (constraints.length > 0) {
      const priceConstraint = constraints.find((c) => c.column === 'item.item_price');
      if (priceConstraint) {
        setPriceRange([Number(priceConstraint.min),Number(priceConstraint.max)]);
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
    setSelectedVariants((prev: Record<string, string[]>): Record<string, string[]> => {
      const isChecked = typeof checked === 'boolean' ? checked : false;
      const currentValues = prev[propertyName] ?? [];
      
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

      <RatingFilter selectedRating={selectedRating} onRatingChange={handleRatingChange} />

      <div className="border-t pt-4 mb-4" />

      <VariantFilters
        variantProperties={variantProperties}
        selectedVariants={selectedVariants}
        onVariantChange={handleVariantChange}
      />
    </div>
  );
}