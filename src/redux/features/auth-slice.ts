import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthUser, LoginCredentials, AuthState } from '../../types/auth.types';
import { login as loginApi } from '../../services/auth.service';
import api from '../../services/api.service';

const initialState: AuthState = {
    user: null,
    loading: true,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            return response;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Login failed');
        }
    }
);

export const fetchUserProfile = createAsyncThunk<AuthUser | null>(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<{ data?: AuthUser }>('/user/get-user');
            return (response.data?.data ?? null);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Failed to fetch profile');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            return null;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message ?? 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser | null>) => {
            if (action.payload) {
                state.user = action.payload;
            }

        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.status === 200 && action?.payload?.data) {
                const data = (action.payload as { data?: { data?: unknown } }).data;
                state.user = data ? (data as { data?: unknown }).data : null;
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.user = action.payload;
            }
        });
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch profile';
            state.user = null;
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
