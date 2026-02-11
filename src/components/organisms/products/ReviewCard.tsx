"use client";

import { Star, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/review.types";

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: Readonly<ReviewCardProps>) {
    return (
        <Card className="border-slate-100 hover:border-slate-200 transition-colors">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-indigo-50">
                            <AvatarImage src={review.user?.profile_image} />
                            <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                                {review.user?.username.charAt(0).toUpperCase() ?? <UserIcon className="w-6 h-6" />}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-bold text-slate-900">{review.user?.username ?? "Verified Customer"}</div>
                            <div className="text-xs text-slate-400">
                                {format(new Date(review.created_at), "MMMM d, yyyy")}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-4 h-4",
                                    i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                                )}
                            />
                        ))}
                    </div>
                </div>
                {review.comment && (
                    <p className="text-slate-700 leading-relaxed pl-1">{review.comment}</p>
                )}
            </CardContent>
        </Card>
    );
}
