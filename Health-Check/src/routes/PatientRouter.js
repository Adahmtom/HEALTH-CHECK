import { Fragment, lazy, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicPaths } from "./path";
import { AuthContext } from "../context";

const paths = [
  {
    path: "",
    element: lazy(() => import("../modules/Patient")),
  },
  {
    path: "/profile",
    element: lazy(() => import("../modules/Patient/Profile")),
  },
  {
    path: "/test/all",
    element: lazy(() => import("../modules/Patient/screens/Totaltests")),
  },
  {
    path: "/test/pending",
    element: lazy(() => import("../modules/Patient/screens/Pending")),
  },
  {
    path: "/test/completed",
    element: lazy(() => import("../modules/Patient/screens/Completed")),
  },
  {
    path: "/test/:id",
    element: lazy(() => import("../modules/Patient/screens/ViewAppointment")),
  },
  {
    path: "/appointment",
    element: lazy(() => import("../modules/Patient/Appointment")),
  },
];

function PatientRouter() {
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

export default PatientRouter;
