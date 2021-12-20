import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { Task } from "../tasks/Task";
import { Workspace } from "../workspaces/Workspace";
import { User } from "./User";

export interface Message {
  id: number;
  text: string;
  workspaceId: number;
  userId: number;
  createdAt: Date;
  user: User;
}
export interface UserState {
  userData: User;
  userError: boolean;
  isUserLoading: boolean;
  activeWorkspace: number;
  activeWorkspaceTasks: Task[];
  isActiveWorkspaceError: boolean;
  isActiveWorkspaceLoading: boolean;
  activeWorkspaceMessages: Message[];
  isActiveWorkspaceMessagesLoading: boolean;
  isActiveWorkspaceMessagesError: boolean;
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
  isUserLoading: false,
  activeWorkspace: 0,
  activeWorkspaceTasks: [],
  isActiveWorkspaceError: false,
  isActiveWorkspaceLoading: true,
  activeWorkspaceMessages: [],
  isActiveWorkspaceMessagesLoading: true,
  isActiveWorkspaceMessagesError: false
};

export const getActiveWorkspaceMessages = createAsyncThunk<Message[], number>(
  "user/getActiveWorkspaceMessage",
  async (id, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/messages/" + id,
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
    return (await response.json()) as Message[];
  }
);

export const getActiveWorkspaceTasks = createAsyncThunk<Task[], number>(
  "user/getActiveWorkspaceTasks",
  async (id, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/tasks/workspace/" + id,
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
    return (await response.json()) as Task[];
  }
);

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
  reducers: {
    setActiveWorkSpace: (state, action: PayloadAction<number>) => {
      state.activeWorkspace = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getClientUserData.pending, (state) => {
      state.isUserLoading = true;
    });

    builder.addCase(getClientUserData.rejected, (state) => {
      state.userError = true;
      state.isUserLoading = false;
    });

    builder.addCase(getClientUserData.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.userData = action.payload;
    });

    builder.addCase(getActiveWorkspaceTasks.pending, (state) => {
      state.isActiveWorkspaceLoading = true;
    });

    builder.addCase(getActiveWorkspaceTasks.rejected, (state) => {
      state.isActiveWorkspaceError = true;
      state.isActiveWorkspaceLoading = false;
    });

    builder.addCase(getActiveWorkspaceTasks.fulfilled, (state, action) => {
      state.isActiveWorkspaceLoading = false;
      state.activeWorkspaceTasks = action.payload;
    });

    builder.addCase(getActiveWorkspaceMessages.pending, (state) => {
      state.isActiveWorkspaceMessagesLoading = true;
    });

    builder.addCase(getActiveWorkspaceMessages.rejected, (state) => {
      state.isActiveWorkspaceMessagesError = true;
      state.isActiveWorkspaceMessagesLoading = false;
    });

    builder.addCase(getActiveWorkspaceMessages.fulfilled, (state, action) => {
      state.isActiveWorkspaceMessagesLoading = false;
      state.activeWorkspaceMessages = action.payload;
    });
  }
});

export const { setActiveWorkSpace } = userSlice.actions;

export default userSlice.reducer;
