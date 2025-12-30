import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllVariantValuesPage,getAllVariantProperties, createVariantProperty, updateVariantProperty, deleteVariantProperty, getAllVariantValues, createVariantValue, updateVariantValue, deleteVariantValue } from '../../services/variant.service';
import {PageParams} from '../../types/pagination.type';
interface VariantState {
    properties: any[];
    values: any[];
    loading: boolean;
    error: string | null;
}

const initialState: VariantState = {
    properties: [],
    values: [],
    loading: false,
    error: null,
};
export const  fetchVariantValuePage = createAsyncThunk(
'variant/fetchAllPage',
    async (pageParams:PageParams, { rejectWithValue }) => {
        try {
            const [propsRes, valuesRes] = await Promise.all([
                getAllVariantProperties(),
                getAllVariantValuesPage(pageParams)
            ]);
            return {
                properties: propsRes.data.data || [],
                values: valuesRes.data || []
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch variant data');
        }
    }
)

export const fetchVariantData = createAsyncThunk(
    'variant/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const [propsRes, valuesRes] = await Promise.all([
                getAllVariantProperties(),
                getAllVariantValues()
            ]);
            return {
                properties: propsRes.data.data || [],
                values: valuesRes.data.data || []
            };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch variant data');
        }
    }
);

export const addVariantProperty = createAsyncThunk(
    'variant/addProperty',
    async (data: { property_name: string }, { rejectWithValue, dispatch }) => {
        try {
            await createVariantProperty(data);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to add variant property');
        }
    }
);

export const editVariantProperty = createAsyncThunk(
    'variant/editProperty',
    async (data: { variantProperty_id: string; property_name: string }, { rejectWithValue, dispatch }) => {
        try {
            await updateVariantProperty(data);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update variant property');
        }
    }
);

export const removeVariantProperty = createAsyncThunk(
    'variant/removeProperty',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            await deleteVariantProperty(id);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete variant property');
        }
    }
);

export const addVariantValue = createAsyncThunk(
    'variant/addValue',
    async (data: { variant_value: string; variantProperty_id: string }, { rejectWithValue, dispatch }) => {
        try {
            await createVariantValue(data);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to add variant value');
        }
    }
);

export const editVariantValue = createAsyncThunk(
    'variant/editValue',
    async (data: { variantValue_id: string; variant_value: string; variantProperty_id: string }, { rejectWithValue, dispatch }) => {
        try {
            await updateVariantValue(data);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update variant value');
        }
    }
);

export const removeVariantValue = createAsyncThunk(
    'variant/removeValue',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            await deleteVariantValue(id);
            dispatch(fetchVariantData());
            return;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete variant value');
        }
    }
);

const variantSlice = createSlice({
    name: 'variant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVariantData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchVariantData.fulfilled, (state, action) => {
            state.loading = false;
            state.properties = action.payload.properties;
            state.values = action.payload.values;
        });
        builder.addCase(fetchVariantData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
         builder.addCase(fetchVariantValuePage.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchVariantValuePage.fulfilled, (state, action) => {
            state.loading = false;
            state.properties = action.payload.properties;
            state.values = action.payload.values.data;
        
        });
        builder.addCase(fetchVariantValuePage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default variantSlice.reducer;
