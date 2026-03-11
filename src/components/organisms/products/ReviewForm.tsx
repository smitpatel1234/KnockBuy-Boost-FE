"use client";

import { useState } from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/store";
import { submitReview } from "@/redux/features/review-slice";
import { toast } from "sonner";
import type { CheckEligibilityResponse } from "@/types/review.types";

interface ReviewFormProps {
    itemId: string;
    userEligibility: CheckEligibilityResponse;
}

export function ReviewForm({ itemId, userEligibility }: Readonly<ReviewFormProps>) {
    const dispatch = useAppDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitReview = async () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            await dispatch(submitReview({ item_id: itemId, rating, comment })).unwrap();
            toast.success("Review submitted successfully");
            setRating(0);
            setComment("");
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-2 border-indigo-50 bg-indigo-50/30 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                    {userEligibility.alreadyReviewed ? "Update Your Review" : "Write a Review"}
                </h3>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Your Rating</label>
                        <div className="flex items-center gap-2">
                            <Rating value={rating} onValueChange={(val) => { setRating(val); }}>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <RatingButton key={i} size={28} className="hover:scale-110 transition-transform" />
                                ))}
                            </Rating>
                            {rating > 0 && <span className="text-sm font-medium text-indigo-600 ml-2">{rating} out of 5</span>}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Your Comment</label>
                        <Textarea
                            placeholder="Tell others what you think about this product..."
                            value={comment}
                            onChange={(e) => { setComment(e.target.value); }}
                            className="min-h-[120px] bg-white border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl resize-none"
                        />
                    </div>

                    <Button
                        onClick={() => { void handleSubmitReview(); }}
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Submitting...
                            </>
                        ) : (
                            userEligibility.alreadyReviewed ? "Update Review" : "Submit Review"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
