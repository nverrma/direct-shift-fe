import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/authentication/PrivateRoute";
import CreatePassword from "./components/createPassword/CreatePassword";
import Dashboard from "./components/dashboard/Dashboard";
import SignInOutContainer from "./containers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignInOutContainer />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create_password"
          element={
            <PrivateRoute>
              <CreatePassword />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
