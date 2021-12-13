import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization } from "./Organization";

export interface OrganizationsState {
  organizations: Organization[];
  organizationsError: boolean;
  isOrganizationsLoading: boolean;
}

const initialState: OrganizationsState = {
  organizations: [],
  organizationsError: false,
  isOrganizationsLoading: false
};

export const getClientOrganizations = createAsyncThunk<Organization[]>(
  "organizations/getClientOrganizations",
  async (_, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/organizations/my",
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
    return (await response.json()) as Organization[];
  }
);

export const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientOrganizations.pending, (state, action) => {
      state.isOrganizationsLoading = true;
    });

    builder.addCase(getClientOrganizations.rejected, (state, action) => {
      state.organizationsError = true;
      state.isOrganizationsLoading = false;
    });

    builder.addCase(getClientOrganizations.fulfilled, (state, action) => {
      state.isOrganizationsLoading = false;
      state.organizations = action.payload;
    });
  }
});

export const {} = organizationsSlice.actions;

export default organizationsSlice.reducer;
