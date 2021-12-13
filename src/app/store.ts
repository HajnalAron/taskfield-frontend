import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import organizationsSlice from "../features/organizations/organizationsSlice";
import workspacesSlice from "../features/workspaces/workspaceSlice";
import tasksSlice from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    organizationsSlice,
    workspacesSlice,
    tasksSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
