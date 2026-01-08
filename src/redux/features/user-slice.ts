import type { UserProfile } from "@/types/user.types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersPage, updateUser, deleteUser } from "@/services/user.service";
import type { PageParams, PaginationResponse } from "@/types/pagination.types";
import { initialPage } from "./const";

interface UserState {
  user: UserProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<PaginationResponse<UserProfile>, PageParams>(
  "user/getAllUsersPage",
  async (pageParams: PageParams, { rejectWithValue }) => {
    try {
      const response = await getAllUsersPage(pageParams);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch users"
      );
    }
  }
)

export const editUser = createAsyncThunk(
  "user/edit",
  async (data: Partial<UserProfile>, { rejectWithValue, dispatch }) => {
    try {
      await updateUser(data);
      void dispatch(fetchUser(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to update item"
      );
    }
  }
);

export const removeUser = createAsyncThunk(
  "user/remove",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteUser(id);
      void dispatch(fetchUser(initialPage));
      return;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message ?? "Failed to delete item"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { loading(state, action: PayloadAction<boolean>) { state.loading = action.payload } },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { loading } = userSlice.actions;
export default userSlice.reducer;
