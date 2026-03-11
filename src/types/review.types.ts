import type { UserProfile } from "./user.types";

export interface Review {
    review_id: string;
    item_id: string;
    user_id: string;
    rating: number;
    comment?: string;
    created_at: string;
    user?: UserProfile;
}

export interface CreateReviewRequestBody {
    item_id: string;
    rating: number;
    comment?: string;
}

export interface ReviewListResponse {
    data: Review[];
    total: number;
}

export interface CheckEligibilityResponse {
    isEligible: boolean;
    alreadyReviewed: boolean;
}
