import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./User";

export interface UserState {
  userData: User;
  userError: boolean;
  isUserLoading: boolean;
}

const initialState: UserState = {
  userData: {
    id: 0,
    email: "",
    firstname: "",
    surname: "",
    avatar: "",
    role: "user"
  },
  userError: false,
  isUserLoading: false
};

export const getClientUserData = createAsyncThunk<User>(
  "user/getClientUserData",
  async (_, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/users/me",
      {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("accessToken")!
        }
      }
    );
    if (!response.ok) {
      return thunkApi.rejectWithValue(await response.json());
    }
    return (await response.json()) as User;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientUserData.pending, (state, action) => {
      state.isUserLoading = true;
    });

    builder.addCase(getClientUserData.rejected, (state, action) => {
      state.userError = true;
      state.isUserLoading = false;
    });

    builder.addCase(getClientUserData.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.userData = action.payload;
    });
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;