import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Item, AddItemParams } from "../../types/item.types";
import {
  getAllItemsPage,
  createItem,
  updateItem,
  deleteItem,

} from "../../services/item.service";
import type { PageParams, PaginationResponse } from "@/types/pagination.types";
import { initialPage } from "@/redux/features/const";
interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchItems = createAsyncThunk<PaginationResponse<Item>, PageParams>(
  "item/fetchAll",
  async (pageParams: PageParams, { rejectWithValue }) => {
    try {
      const response = await getAllItemsPage(pageParams);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch items"
      );
    }
  }
);

export const addItem = createAsyncThunk(
  "item/add",
  async (data: AddItemParams, { rejectWithValue, dispatch }) => {
    try {
      await createItem(data);
      void dispatch(fetchItems(initialPage));

      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to add item"
      );
    }
  }
);

export const editItem = createAsyncThunk(
  "item/edit",
  async (data: Partial<Item>, { rejectWithValue, dispatch }) => {
    try {
      await updateItem(data);
      void dispatch(fetchItems(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update item"
      );
    }
  }
);

export const removeItem = createAsyncThunk(
  "item/remove",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteItem(id);
      void dispatch(fetchItems(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to delete item"
      );
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: { loading(state, action: PayloadAction<boolean>) { state.loading = action.payload } },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload?.data ?? [];
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(editItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
        builder.addCase(addItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { loading } = itemSlice.actions;
export default itemSlice.reducer;
