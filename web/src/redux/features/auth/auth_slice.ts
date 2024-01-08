import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginService, registerService } from './auth_services';
import { Error } from 'src/utils/typing';

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
		rejectValue: Error;
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

export const registerUser = createAsyncThunk<
	InitialData,
	{ name: string; email: string; password: string },
	{
		rejectValue: Error;
	}
>(
	'registerUser',
	async (
		data: { name: string; email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const result = await registerService(data);
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
			state.error = '';
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
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true;
			state.error = '';
		});

		// Handle fulfilled action
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = '';
		});

		// Handle rejected action
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload?.message;
		});
	},
});

export default auth.reducer;
