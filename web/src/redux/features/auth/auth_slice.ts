import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Error, loginService } from './auth_services';

type InitialData = {
	id: string;
	email: string;
	name: string;
	role: string;
	address: string;
	profileImg: string;
	state: string;
	region: string;
};

type InitialState = {
	data: InitialData;
	loading: boolean;
	error: undefined | string;
};

export const loginUser = createAsyncThunk<
	InitialData,
	{ email: string; password: string },
	{
		rejectValue: Error; // Specify the type for rejectValue
	}
>(
	'loginUser',
	async (data: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const result = await loginService(data);
			return result;
		} catch (error: any) {
			return rejectWithValue(error as Error);
		}
	}
);

export const auth = createSlice({
	name: 'auth',
	initialState: {} as InitialState,
	reducers: {},
	extraReducers: (builder) => {
		// Handle pending action
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
		});

		// Handle fulfilled action
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = '';
		});

		// Handle rejected action
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload?.message;
		});
	},
});

export default auth.reducer;
