import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { findAll } from './product_services';

type InitialState = {
	data: {},
	loading: boolean,
	error: undefined | string
}

export const getProducts = createAsyncThunk<
	{},
	{ sort: string; page: string },
	{
		rejectValue: Error;
	}
>(
	'getProducts',
	async (data: { sort: string; page: string }, { rejectWithValue }) => {
		try {
			const result = await findAll(data.sort, data.page);
			return result;
		} catch (error: any) {
			return rejectWithValue(error as Error);
		}
	}
);


export const productSlice = createSlice({
	name: 'product',
	initialState: {} as InitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.loading = true;
			state.error = '';
		});

		// Handle fulfilled action
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = '';
		});

		// Handle rejected action
		builder.addCase(getProducts.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload?.message;
		});
	}
})

export default productSlice.reducer;