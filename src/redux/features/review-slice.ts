import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Review, CreateReviewRequestBody, ReviewListResponse, CheckEligibilityResponse } from '../../types/review.types';
import { getReviewsByItem, checkReviewEligibility, createOrUpdateReview } from '../../services/review.service';

interface ReviewState {
    reviews: Review[];
    totalReviews: number;
    userEligibility: CheckEligibilityResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    totalReviews: 0,
    userEligibility: null,
    loading: false,
    error: null
};

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async ({ itemId, page, limit }: { itemId: string; page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            const response = await getReviewsByItem(itemId, page, limit);
            const data: ReviewListResponse = response.data.data;
            return data;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch reviews');
        }
    }
);

export const fetchEligibility = createAsyncThunk(
    'reviews/fetchEligibility',
    async (itemId: string, { rejectWithValue }) => {
        try {
            const response = await checkReviewEligibility(itemId);
            return response.data.data;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch eligibility');
        }
    }
);

export const submitReview = createAsyncThunk(
    'reviews/submitReview',
    async (data: CreateReviewRequestBody, { rejectWithValue, dispatch }) => {
        try {
            await createOrUpdateReview(data);
            void dispatch(fetchReviews({ itemId: data.item_id }));
            void dispatch(fetchEligibility(data.item_id));
            return true;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to submit review');
        }
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearReviewState: (state) => {
            state.reviews = [];
            state.totalReviews = 0;
            state.userEligibility = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.data;
                state.totalReviews = action.payload.total;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchEligibility.fulfilled, (state, action) => {
                state.userEligibility = action.payload;
            });
    }
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
