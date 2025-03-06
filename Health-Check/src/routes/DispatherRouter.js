import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";
import { AuthContext } from "../context";

const paths = [
  {
    path: "/order/available",
    element: lazy(() => import("../modules/Dispatcher/AvailableOrder")),
  },
  {
    path: "/order/available/:id",
    element: lazy(() => import("../modules/Dispatcher/ViewAvailable")),
  },
  {
    path: "/order/pending",
    element: lazy(() => import("../modules/Dispatcher/screens/PendingOrder")),
  },
  {
    path: "/order/completed",
    element: lazy(() => import("../modules/Dispatcher/screens/CompletedOrder")),
  },
  {
    path: "/order/all",
    element: lazy(() => import("../modules/Dispatcher/screens/TotalOrder")),
  },
  {
    path: "/order/:id",
    element: lazy(() => import("../modules/Dispatcher/screens/ViewOrder")),
  },
  {
    path: "/order/pending/:id",
    element: lazy(() => import("../modules/Dispatcher/RecievedOrder")),
  },

  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function DispatcherRouter() {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={`${PublicPaths.LOGIN}`} replace />;
  }
  return (
    <Routes>
      {paths.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default DispatcherRouter;
