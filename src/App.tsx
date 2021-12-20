import Layout from "./components/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/ClientDashBoard/DashBoard";
import WorkspaceDashBoard from "./components/WorkspaceDashBoard/WorkspaceDashBoard";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout render={<DashBoard />} />} />
        <Route
          path="/workspaces/:workspaceId/dashboard"
          element={<Layout render={<WorkspaceDashBoard />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
