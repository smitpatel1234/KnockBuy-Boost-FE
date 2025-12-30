'use client';
import React from 'react'
import { Rating, RatingButton } from '@/components/ui/rating';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';
import { FormikProps } from 'formik';
import { Item } from '@/types/item.type';
import { useAppSelector, RootState } from '@/redux/store';
import { Category } from '@/types/category.type';

interface ProductsPriceProps {
  formik: FormikProps<Item>
}

export default function ProductsPrice({ formik }: ProductsPriceProps) {
  const { categories } = useAppSelector((state: RootState) => state.category);
   
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4 overflow-x-auto pb-4">
        <div className="flex flex-col min-w-[150px] bg-slate-50 border border-slate-200 rounded-lg p-4 ">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Rating</h3>
          <Rating
            value={formik.values.rating}
            onValueChange={(val) => formik.setFieldValue('rating', val)}
            className='mt-1'
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} className='mt-1' />
            ))}
          </Rating>
        </div>

        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="item_price" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Price</Label>
          <Input
            type="number"
            id="item_price"
            name="item_price"
            placeholder="0.00"
            className="h-10 border-slate-300 focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.item_price}
          />
          {formik.touched.item_price && formik.errors.item_price && (
            <div className="text-red-500 text-sm">{formik.errors.item_price}</div>
          )}
        </div>

        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="stock" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Stock</Label>
          <Input
            type="number"
            id="stock"
            name="stock"
            placeholder="Enter stock"
            className="h-10 border-slate-300 focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <div className="text-red-500 text-sm">{formik.errors.stock}</div>
          )}
        </div>

        <div className="flex-1 min-w-[200px] space-y-2">
          <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Category</Label>
          <Select
            value={formik.values.category_id}
            onValueChange={(value) => formik.setFieldValue('category_id', value)}
          >
            <SelectTrigger className="h-10 border-slate-300 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Existing Categories</SelectLabel>
                {categories.map((cat: Category) => (
                  <SelectItem key={cat.category_id} value={cat.category_id}>{cat.category_name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.category_id && formik.errors.category_id && (
            <div className="text-red-500 text-sm">{formik.errors.category_id}</div>
          )}
        </div>
      </div>
    </div>
  )
}
