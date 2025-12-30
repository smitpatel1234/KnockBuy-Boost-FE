import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Item, AddItemParams } from "../../types/item.type";
import {
  getAllItemsPage,
  createItem,
  updateItem,
  deleteItem,

} from "../../services/item.service";
import { PageParams  } from "@/types/pagination.type";
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


export const fetchItems = createAsyncThunk(
  "item/fetchAll",
  async (pageParams:PageParams, { rejectWithValue }) => {
    try {
      const response = await getAllItemsPage(pageParams);
      return response.data || [];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch items"
      );
    }
  }
);

export const addItem = createAsyncThunk(
  "item/add",
  async (data: AddItemParams, { rejectWithValue, dispatch }) => {
    try {
      await createItem(data);
      dispatch(fetchItems(initialPage));
      
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add item"
      );
    }
  }
);

export const editItem = createAsyncThunk(
  "item/edit",
  async (data: Partial<Item>, { rejectWithValue, dispatch }) => {
    try {
      await updateItem(data);
      dispatch(fetchItems(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update item"
      );
    }
  }
);

export const removeItem = createAsyncThunk(
  "item/remove",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteItem(id);
      dispatch(fetchItems(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete item"
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
      state.items = action.payload.data;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { loading } = itemSlice.actions;
export default itemSlice.reducer;
