"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/review.types";

interface ReviewSummaryProps {
    averageRating: string;
    totalReviews: number;
    reviews: Review[];
}

export function ReviewSummary({ averageRating, totalReviews, reviews }: Readonly<ReviewSummaryProps>) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <div className="text-center md:border-r border-slate-200">
                <div className="text-5xl font-bold text-slate-900 mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                            key={i}
                            className={cn(
                                "w-5 h-5",
                                i <= Math.round(Number(averageRating))
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                            )}
                        />
                    ))}
                </div>
                <div className="text-sm text-slate-500 font-medium">Based on {totalReviews} reviews</div>
            </div>

            <div className="md:col-span-2 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-4">
                            <div className="text-sm font-medium text-slate-600 w-8">{star} ★</div>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                    style={{ width: `${String(percentage)}%` }}
                                />
                            </div>
                            <div className="text-sm text-slate-400 w-10 text-right">{Math.round(percentage)}%</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
