import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Discount, AddDiscountParams } from "../../types/discount.type";
import {
  getAllDiscountsPage,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../services/discount.service";
import { PageParams } from "@/types/pagination.type";
import { initialPage } from "./const";
interface DiscountState {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  loading: false,
  error: null,
};

export const fetchDiscounts = createAsyncThunk(
  "discount/fetchAll",
  async (pageParams: PageParams, { rejectWithValue }) => {
    try {
      const response = await getAllDiscountsPage(pageParams);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch discounts"
      );
    }
  }
);

export const addDiscount = createAsyncThunk(
  "discount/add",
  async (data: AddDiscountParams, { rejectWithValue }) => {
    try {
      await createDiscount(data);

      fetchDiscounts(initialPage);
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add discount"
      );
    }
  }
);

export const editDiscount = createAsyncThunk(
  "discount/edit",
  async (data: Partial<Discount>, { rejectWithValue ,dispatch}) => {
    try {
      await updateDiscount(data);

      dispatch(fetchDiscounts(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update discount"
      );
    }
  }
);

export const removeDiscount = createAsyncThunk(
  "discount/remove",
  async (id: string, { rejectWithValue ,dispatch}) => {
    try {
      await deleteDiscount(id);


      dispatch(fetchDiscounts(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete discount"
      );
    }
  }
);
const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDiscounts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDiscounts.fulfilled, (state, action) => {
      state.loading = false;
      state.discounts = action.payload.data;
    });
    builder.addCase(fetchDiscounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setLoading } = discountSlice.actions;
export default discountSlice.reducer;
