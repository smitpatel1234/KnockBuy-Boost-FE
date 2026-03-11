import api, { publicapi } from "./api.service";
import type { CreateReviewRequestBody, ReviewListResponse, CheckEligibilityResponse } from "../types/review.types";

export const getReviewsByItem = (itemId: string, page = 1, limit = 10) => {
    return publicapi.get<{ message: string; data: ReviewListResponse }>(`/item/get-item/${itemId}/reviews`, {
        params: { page, limit }
    });
};

export const checkReviewEligibility = (itemId: string) => {
    return api.get<{ message: string; data: CheckEligibilityResponse }>(`/item/get-item/${itemId}/review-eligibility`);
};

export const createOrUpdateReview = (data: CreateReviewRequestBody) => {
    return api.post<{ message: string; data: { review_id: string } }>("/item/reviews", data);
};
