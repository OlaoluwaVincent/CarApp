import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findAll } from "./product_services";
import { GetProductsData, InitialState, Product } from "src/utils/typing";

const initData: InitialState = {
  data: null,
  loading: false,
  error: "",
};

export const getProducts = createAsyncThunk<
  Product,
  GetProductsData,
  { rejectValue: Error }
>("getProducts", async (data: GetProductsData | undefined, { rejectWithValue }) => {
  try {
    const result = await findAll(data);
    return result;
  } catch (error: any) {
    return rejectWithValue(error as Error);
  }
});
export const productSlice = createSlice({
  name: "product",
  initialState: initData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default productSlice.reducer;
