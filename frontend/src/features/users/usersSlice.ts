import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { login, logout, register } from "./usersThunk";
import { GlobalError, IUser, ValidationError } from "../../types";

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  deleteLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  deleteLoading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: userResponse }) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.usersStore.user;
