import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "../../_helpers/history";

export { PrivateRoute };

function PrivateRoute({ children }) {
  const { authChecked } = useSelector((state) => state.signInUserReducer);

  const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
      return localStorage.getItem("token");
    }
  };
  const token = getToken();

  if (!authChecked && !token) {
    return <Navigate to="/" state={{ from: history.location }} />;
  }
  return children;
}
