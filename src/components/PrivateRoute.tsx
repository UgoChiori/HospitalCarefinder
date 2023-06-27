

import { Navigate, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ element, ...rest }: any) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/signin" replace />
  );
}