import { UserProfile } from "@/types/user.type";
import { createSlice , createAsyncThunk , PayloadAction} from "@reduxjs/toolkit";
import { getAllUsersPage,updateUser,getUser,deleteUser } from "@/services/user.service";
import { PageParams } from "@/types/pagination.type";
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

export const fetchUser = createAsyncThunk(
   "user/getAllUsersPage",
   async (pageParams:PageParams, { rejectWithValue }) => {
     try {
       const response = await getAllUsersPage(pageParams);
       return response.data || [];
     } catch (err: any) {
       return rejectWithValue(
         err.response?.data?.message || "Failed to fetch items"
       );
     }
   }
)



export const editUser = createAsyncThunk(
  "user/edit",
  async (data: Partial<UserProfile>, { rejectWithValue, dispatch }) => {
    try {
      await updateUser(data);
      dispatch(fetchUser(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update item"
      );
    }
  }
);

export const User= createAsyncThunk(
  "user/remove",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteUser(id);
      dispatch(fetchUser(initialPage));
      return;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete item"
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


