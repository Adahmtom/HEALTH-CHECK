import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";
import { AuthContext } from "../context";

const paths = [
  {
    path: "/order/available",
    element: lazy(() => import("../modules/Lab/AvailableLab")),
  },
  {
    path: "/order/available/:id",
    element: lazy(() => import("../modules/Lab/ViewLab")),
  },
  {
    path: "/test/pending",
    element: lazy(() => import("../modules/Lab/screens/PendingTest")),
  },
  {
    path: "/test/completed",
    element: lazy(() => import("../modules/Lab/screens/CompletedTest")),
  },
  {
    path: "/test/all",
    element: lazy(() => import("../modules/Lab/screens/TotalTest")),
  },
  {
    path: "/test/:id",
    element: lazy(() => import("../modules/Lab/screens/ViewTest")),
  },
  {
    path: "/test/view/:id",
    element: lazy(() => import("../modules/Lab/screens/view")),
  },
  {
    path: "/test/view/completed/:id",
    element: lazy(() => import("../modules/Lab/screens/completedView")),
  },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function LabRouter() {
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

export default LabRouter;
