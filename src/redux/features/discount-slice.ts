import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Discount, AddDiscountParams } from "../../types/discount.types";
import {
  getAllDiscountsPage,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../services/discount.service";
import type { PageParams, PaginationResponse } from "@/types/pagination.types";
import { initialPage } from "./const";
import { toast } from "sonner";
import { formatDate } from "@/utils/common/formatDate";

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

export const fetchDiscounts = createAsyncThunk<
  PaginationResponse<Discount>,
  PageParams,
  { rejectValue: string }
>(
  "discount/fetchAll",
  async (pageParams, { rejectWithValue }) => {
    try {
      const response = await getAllDiscountsPage(pageParams);
      
      const transformedData = response.data.data.map((discount: Discount) => ({
        ...discount,
        ...(discount.discount_start_date && {
          discount_start_date: formatDate(discount.discount_start_date)
        })
      }));

      const result: PaginationResponse<Discount> = {
        ...response.data,
        data: transformedData
      };
      return result;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error.response?.data?.message ?? "Failed to fetch discounts";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const addDiscount = createAsyncThunk(
  "discount/add",
  async (data: AddDiscountParams, { dispatch }) => {
    try {
      await createDiscount(data);
      void dispatch(fetchDiscounts(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to add discount");
      throw err;
    }
  }
);

export const editDiscount = createAsyncThunk(
  "discount/edit",
  async (data: Partial<Discount>, { dispatch }) => {
    try {
      await updateDiscount(data);
      void dispatch(fetchDiscounts(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to update discount");
      throw err;
    }
  }
);

export const removeDiscount = createAsyncThunk(
  "discount/remove",
  async (id: string, { dispatch }) => {
    try {
      await deleteDiscount(id);
      void dispatch(fetchDiscounts(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message ?? "Failed to delete discount");
      throw err;
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
      state.error = (action.payload as string) ? (action.payload as string) : "Failed to fetch discounts";
    });
  },
});

export const { setLoading } = discountSlice.actions;
export default discountSlice.reducer;
