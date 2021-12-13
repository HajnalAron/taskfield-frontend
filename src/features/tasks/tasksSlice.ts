import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./Task";

export interface TasksState {
  tasks: Task[];
  tasksError: boolean;
  isTasksLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  tasksError: false,
  isTasksLoading: false
};

export const getClientTasks = createAsyncThunk<Task[]>(
  "organizations/getClientTasks",
  async (_, thunkApi) => {
    const response = await fetch(
      import.meta.env.VITE_APP_BACKEND_URL + "/tasks/my",
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

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClientTasks.pending, (state, action) => {
      state.isTasksLoading = true;
    });

    builder.addCase(getClientTasks.rejected, (state, action) => {
      state.tasksError = true;
      state.isTasksLoading = false;
    });

    builder.addCase(getClientTasks.fulfilled, (state, action) => {
      state.isTasksLoading = false;
      state.tasks = action.payload;
    });
  }
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
