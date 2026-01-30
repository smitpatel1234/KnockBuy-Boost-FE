import { Sparkles } from "lucide-react";
import type { VariantSectionProps } from "@/types/product-display.types";

export function VariantSection({
  variantProperty,
  variants,
}: Readonly<VariantSectionProps>) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-100 pt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        Available Variants
      </h3>
      <div className="space-y-5">
        {variantProperty.map((variantId) => {
          const propertyName = variants.find(
            (vo) => vo.variantProperty_id === variantId
          )?.property_name;
          const propertyValues = variants.filter(
            (variant) => variant.variantProperty_id === variantId
          );

          return (
            <div key={variantId} className="space-y-3">
              {/* Property Name */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  {propertyName}:
                </span>
              </div>

              {/* Property Values */}
              <div className="flex flex-wrap gap-3">
                {propertyValues.map((variant) => (
                  <button
                    key={variant.variantValue_id}
                    className="group relative px-5 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 hover:border-indigo-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">{variant.variant_value}</span>
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 rounded-lg transition-all duration-200"></div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
