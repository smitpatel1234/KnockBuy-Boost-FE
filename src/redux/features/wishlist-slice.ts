import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { WishlistState } from '../../types/wishlist.types';
import { getUserWishlist, addToWishlist as addToWishlistApi, removeFromWishlist as removeFromWishlistApi } from '../../services/wishlist.service';



const initialState: WishlistState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserWishlist();
            return response.data.data;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch wishlist');
        }
    }
);

export const toggleWishlist = createAsyncThunk(
    'wishlist/toggleWishlist',
    async ({ item_id, isInWishlist }: { item_id: string; isInWishlist: boolean }, { rejectWithValue, dispatch }) => {
        try {
            if (isInWishlist) {
                await removeFromWishlistApi(item_id);
                return { item_id, removed: true };
            } else {
                await addToWishlistApi(item_id);
                void dispatch(fetchWishlist());
                return { item_id, removed: false };
            }
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to update wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(toggleWishlist.fulfilled, (state, action) => {
                if (action.payload.removed) {
                    state.items = state.items.filter(item => item.item_id !== action.payload.item_id);
                }
            });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
