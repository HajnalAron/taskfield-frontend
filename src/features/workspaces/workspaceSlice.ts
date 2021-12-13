import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "./Workspace";

export interface WorkspacesState {
  workspaces: Workspace[];
  workspacesError: boolean;
  isWorkspacesLoading: boolean;
}

const initialState: WorkspacesState = {
  workspaces: [],
  workspacesError: false,
  isWorkspacesLoading: false
};

export const getClientWorkspaces = createAsyncThunk<Workspace[]>(
  "organizations/getClientWorkspaces",
  async (_, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/workspaces/my",
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
    return (await response.json()) as Workspace[];
  }
);

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientWorkspaces.pending, (state, action) => {
      state.isWorkspacesLoading = true;
    });

    builder.addCase(getClientWorkspaces.rejected, (state, action) => {
      state.workspacesError = true;
      state.isWorkspacesLoading = false;
    });

    builder.addCase(getClientWorkspaces.fulfilled, (state, action) => {
      state.isWorkspacesLoading = false;
      state.workspaces = action.payload;
    });
  }
});

export const {} = workspacesSlice.actions;

export default workspacesSlice.reducer;
