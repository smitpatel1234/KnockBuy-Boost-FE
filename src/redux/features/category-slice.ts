import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Category, AddCategoryParams } from '../../types/category.type';
import { getAllCategoriesPage, getAllCategories,createCategory, updateCategory, deleteCategory } from '../../services/category.service';
import { PageParams } from '../../types/pagination.type';
import { initialPage } from './const';

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
    currentParentId: string | null;
    selectedCategoryId: string | null;
}


const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
    currentParentId: null,
    selectedCategoryId: null,
};
export const fetchCategoriesAll = createAsyncThunk(
    'category/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllCategories();
            return response.data.data || [];
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }

    }
);

export const fetchCategories = createAsyncThunk(
    'category/fetchAllPage',
    async (data: PageParams, { rejectWithValue }) => {
        try {
            const response = await getAllCategoriesPage(data);
            return response.data || [];
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }

    }
);

export const addCategory = createAsyncThunk(
    'category/add',
    async (data: AddCategoryParams, { rejectWithValue, dispatch }) => {
        try {
            await createCategory(data);
            dispatch(fetchCategories(initialPage));
            return;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to add category');
        }

    }
);

export const editCategory = createAsyncThunk(
    'category/edit',
    async (data: Partial<Category>, { rejectWithValue, dispatch }) => {
        try {
            await updateCategory(data);
            dispatch(fetchCategories(initialPage));
            return;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }

    }
);

export const removeCategory = createAsyncThunk(
    'category/remove',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            await deleteCategory(id);
            dispatch(fetchCategories(initialPage));
            return;
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }

    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrentParentId: (state, action: PayloadAction<string | null>) => {
            state.currentParentId = action.payload;
        },
        setSelectedCategoryId: (state, action: PayloadAction<string | null>) => {
            state.selectedCategoryId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesAll.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategoriesAll.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategoriesAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.data;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setCurrentParentId, setSelectedCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
