import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginCredentials, AuthState } from '../../types/auth.type';
import { login as loginApi } from '../../services/auth.service';
import api from '../../services/api.service';

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/get-user');
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return null;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
  
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
  
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchUserProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
