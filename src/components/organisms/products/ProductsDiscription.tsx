import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FormikProps } from 'formik'
import { Item } from '@/types/item.type'

interface ProductsDiscriptionProps {
  formik: FormikProps<Item>
}

export default function ProductsDiscription({ formik }: ProductsDiscriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor='item_name'>Product Name</Label>
        <Input
          id='item_name'
          name='item_name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.item_name}
        />
        {formik.touched.item_name && formik.errors.item_name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.item_name}</div>
        )}
      </div>
      <div>
        <Label htmlFor='description'>Product Description</Label>
        <Textarea
          id='description'
          name='description'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
        )}
      </div>
    </div>
  )
}
