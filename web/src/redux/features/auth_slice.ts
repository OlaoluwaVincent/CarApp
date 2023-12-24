import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type InitialState = {
	data: {
		name: string;
		email: string;
		userId: string;
		role: string;
		profileImg?: string;
	};
	loading: boolean;
	error: undefined | string;
};

export const loginUser = createAsyncThunk(
	'loginUser',
	async (data: { email: string; password: string }) => {
		console.log(data);
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
			// state.data = action.payload;
		});

		// Handle rejected action
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default auth.reducer;
