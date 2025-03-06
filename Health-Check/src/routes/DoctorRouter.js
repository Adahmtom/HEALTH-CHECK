import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const privateRoutes = [
  {
    path: "/consultations/all",
    element: lazy(() => import("../modules/Doctor/screens/TotalConsult")),
  },
  {
    path: "/consultations/completed",
    element: lazy(() => import("../modules/Doctor/screens/CompletedConsult")),
  },
  {
    path: "/consultations/pending",
    element: lazy(() => import("../modules/Doctor/screens/PendingConsult")),
  },
  {
    path: "/consultation/:id",
    element: lazy(() => import("../modules/Doctor/screens/ViewConsult")),
  },
  {
    path: "completed/consultation/:id",
    element: lazy(() => import("../modules/Doctor/screens/view")),
  },
  // {
  //   path: "/test/available",
  //   element: lazy(() => import("../modules/Doctor/screens/Availabletest")),
  // },

  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Doctor() {
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Doctor;
