'use client';

import React from 'react';
import { Star, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const RATINGS: number[] = [4, 3, 2, 1];

interface RatingFilterProps {
  selectedRating: string;
  onRatingChange: (value: string) => void;
}

export function RatingFilter({ selectedRating, onRatingChange }: Readonly<RatingFilterProps>): React.ReactElement {
  return (
    <Collapsible defaultOpen className="mb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-semibold mb-3 hover:underline">
        <span>Customer Review</span>
        <ChevronDown className="w-4 h-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <RadioGroup value={selectedRating} onValueChange={onRatingChange}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="0" id="r0" />
            <Label htmlFor="r0" className="cursor-pointer">All Ratings</Label>
          </div>
          {RATINGS.map((rating: number) => (
            <div key={rating} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={String(rating)} id={`r${String(rating)}`} />
              <Label htmlFor={`r${String(rating)}`} className="flex items-center cursor-pointer">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={`star-filled-${String(rating)}-${String(i)}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star key={`star-empty-${String(rating)}-${String(i)}`} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-2">& Up</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
