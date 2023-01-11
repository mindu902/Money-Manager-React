import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builders) {
    builders.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builders.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builders.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
    builders.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
