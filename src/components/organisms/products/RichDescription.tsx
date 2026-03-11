"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RichDescription as RichDescriptionType } from "@/types/item.types";

interface RichDescriptionProps {
    content?: RichDescriptionType;
}

export function RichDescription({ content }: Readonly<RichDescriptionProps>) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!content) return null;

    const hasContent = content.how_its_made ?? content.how_to_use ??
        (content.key_features && Object.keys(content.key_features).length > 0) ??
        (content.specifications && content.specifications.length > 0);

    if (!hasContent) return null;

    return (
        <div className="space-y-6">
            <div
                className={cn(
                    "relative overflow-hidden transition-all duration-300 space-y-6",
                    !isExpanded && "max-h-[400px]"
                )}
            >
                {content.how_its_made && (
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">How It&apos;s Made</h4>
                        <p className="text-gray-700 leading-relaxed">{content.how_its_made}</p>
                    </div>
                )}

                {content.how_to_use && (
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h4>
                        <p className="text-gray-700 leading-relaxed">{content.how_to_use}</p>
                    </div>
                )}

                {content.key_features && Object.keys(content.key_features).length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(content.key_features).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 rounded-lg p-4">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">{key}</dt>
                                    <dd className="text-gray-900">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {content.specifications && content.specifications.length > 0 && (
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h4>
                        <ul className="space-y-2">
                            {content.specifications.map((spec, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-indigo-600 mr-2">•</span>
                                    <span className="text-gray-700">{spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                )}
            </div>

            <button
                onClick={() => { setIsExpanded(!isExpanded); }}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
                {isExpanded ? (
                    <>
                        Show Less <ChevronUp className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        Read More <ChevronDown className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    );
}
