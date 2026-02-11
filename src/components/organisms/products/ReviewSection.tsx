"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchReviews, fetchEligibility } from "@/redux/features/review-slice";
import { MessageSquare, Loader2, Star, AlertCircle, ShoppingBag } from "lucide-react";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewForm } from "./ReviewForm";
import { ReviewCard } from "./ReviewCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewSectionProps {
    itemId: string;
}

export function ReviewSection({ itemId }: Readonly<ReviewSectionProps>) {
    const dispatch = useAppDispatch();
    const { reviews, loading, userEligibility, totalReviews } = useAppSelector((state) => state.reviews);
    const { user } = useAppSelector((state) => state.auth);
    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        void dispatch(fetchReviews({ itemId }));
        void dispatch(fetchEligibility(itemId));
    }, [itemId, dispatch, user]);

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "0";

    const handleWriteReviewClick = () => {
        if (!user) {
            // User not logged in - could trigger login modal here
            alert("Please log in to write a review");
            return;
        }
        setShowReviewForm(true);
    };

    return (
        <div className="space-y-8">
            <ReviewSummary
                averageRating={averageRating}
                totalReviews={totalReviews}
                reviews={reviews}
            />

            {/* Write Review Button - Always Visible */}
            {!showReviewForm && (
                <div className="flex justify-center">
                    <Button
                        onClick={handleWriteReviewClick}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2"
                    >
                        <Star className="w-5 h-5" />
                        Write a Review
                    </Button>
                </div>
            )}

            {/* Review Form or Eligibility Messages */}
            {showReviewForm && (
                <>
                    {!user ? (
                        <Alert className="border-orange-200 bg-orange-50">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <AlertDescription className="text-orange-900">
                                <strong>Please log in</strong> to write a review for this product.
                            </AlertDescription>
                        </Alert>
                    ) : userEligibility?.isEligible || userEligibility?.alreadyReviewed ? (
                        <ReviewForm itemId={itemId} userEligibility={userEligibility} />
                    ) : (
                        <Alert className="border-blue-200 bg-blue-50">
                            <ShoppingBag className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-900">
                                <strong>Purchase required:</strong> You need to purchase and receive this product before you can write a review.
                            </AlertDescription>
                        </Alert>
                    )}
                </>
            )}

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Customer Reviews</h3>
                    {showReviewForm && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => { setShowReviewForm(false); }}
                            className="text-slate-600 hover:text-slate-900"
                        >
                            Hide Form
                        </Button>
                    )}
                </div>
                {loading && reviews.length === 0 ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {reviews.map((review) => (
                            <ReviewCard key={review.review_id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
