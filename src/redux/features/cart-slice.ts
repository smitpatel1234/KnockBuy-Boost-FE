import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { GetAllItemCartType, ItemCartUpdateType } from '../../types/itemcart.types';
import type { Discount } from '../../types/discount.types';
import { getItemCart, updateItemCart, deleteItemCart } from '../../services/cartitem.service';
import { validatePromo } from '../../services/discount.service';

interface CartState {
    items: GetAllItemCartType[];
    discountData: Discount | null;
    loading: boolean;
    error: string | null;
}
const initialState: CartState = { items: [], discountData: null, loading: false, error: null };

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const response = await getItemCart();
        return response.data.data;
    } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch cart');
    }
});
export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id: string, { rejectWithValue, dispatch }) => {
    try {
        await deleteItemCart({ cart_item_id: id });
        void dispatch(fetchCart());
        return id;
    } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message ?? 'Failed to remove item');
    }
});
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async (payload: ItemCartUpdateType, { rejectWithValue, dispatch }) => {
    try {
        await updateItemCart(payload);
        void dispatch(fetchCart());
        return payload;
    } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message ?? 'Failed to update quantity');
    }
});
export const applyPromoCode = createAsyncThunk('cart/applyPromoCode', async (code: string, { rejectWithValue }) => {
    try {
        const response = await validatePromo(code);
        return response.data.data;
    } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message ?? 'Invalid or inactive promo code');
    }
});
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => { state.items = []; state.discountData = null; state.error = null; },
        setDiscountData: (state, action: PayloadAction<Discount | null>) => { state.discountData = action.payload; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
            .addCase(applyPromoCode.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(applyPromoCode.fulfilled, (state, action) => { state.loading = false; state.discountData = action.payload; })
            .addCase(applyPromoCode.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    },
});
export const { clearCart, setDiscountData } = cartSlice.actions;
export default cartSlice.reducer;
