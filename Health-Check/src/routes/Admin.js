import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const privateRoutes = [
  {
    path: "/settings/checklist",
    element: lazy(() => import("../modules/Admin/Checklist")),
  },
  {
    path: "/appointment/all",
    element: lazy(() => import("../modules/Admin/appointment/All")),
  },
  {
    path: "/appointment/pending",
    element: lazy(() => import("../modules/Admin/appointment/Pending")),
  },
  {
    path: "/appointment/completed",
    element: lazy(() => import("../modules/Admin/appointment/Completed")),
  },
  {
    path: "/appointment/completed/:id",
    element: lazy(() => import("../modules/Admin/appointment/ViewCompleted")),
  },
  {
    path: "/appointment/:id",
    element: lazy(() => import("../modules/Admin/appointment/ViewAppointment")),
  },
  {
    path: "/settings/sample",
    element: lazy(() => import("../modules/Admin/Sample")),
  },
  {
    path: "/test/all",
    element: lazy(() => import("../modules/Admin/screens/Totaltests")),
  },
  {
    path: "/test/:id",
    element: lazy(() => import("../modules/Admin/screens/ViewTest")),
  },
  {
    path: "/settings/test",
    element: lazy(() => import("../modules/Admin/Test")),
  },
  {
    path: "/settings/test/:id",
    element: lazy(() => import("../modules/Admin/EditTest")),
  },
  {
    path: "/settings/test/create",
    element: lazy(() => import("../modules/Admin/CreateTest")),
  },
  {
    path: "/settings/test/completed",
    element: lazy(() =>
      import("../modules/Admin/screens/CompletedTest/Completed")
    ),
  },
  {
    path: "/settings/test/completed/:id",
    element: lazy(() => import("../modules/Admin/screens/CompletedTest/View")),
  },

  {
    path: "/users/all",
    element: lazy(() => import("../modules/Admin/screens/All Users/index")),
  },
  {
    path: "/users/all/:id",
    element: lazy(() => import("../modules/Admin/screens/All Users/ViewUser")),
  },
  {
    path: "/users/doctors",
    element: lazy(() => import("../modules/Admin/screens/Doctors/Doctors")),
  },
  {
    path: "/users/doctors/:id",
    element: lazy(() => import("../modules/Admin/screens/Doctors/ViewDis")),
  },
  {
    path: "/users/collectors",
    element: lazy(() =>
      import("../modules/Admin/screens/Collectors/Collectors")
    ),
  },
  {
    path: "/users/collectors/:id",
    element: lazy(() =>
      import("../modules/Admin/screens/Collectors/ViewColls")
    ),
  },
  {
    path: "/users/patients",
    element: lazy(() => import("../modules/Admin/screens/Patients/Patient")),
  },
  {
    path: "/users/patients/:id",
    element: lazy(() => import("../modules/Admin/screens/Patients/ViewPat")),
  },
  {
    path: "/users/dispatchers",
    element: lazy(() =>
      import("../modules/Admin/screens/Dispatcher/Dispatcher")
    ),
  },
  {
    path: "/users/dispatchers/:id",
    element: lazy(() => import("../modules/Admin/screens/Dispatcher/ViewDis")),
  },
  {
    path: "/users/labs",
    element: lazy(() => import("../modules/Admin/screens/Lab/Lab")),
  },
  {
    path: "/users/labs/:id",
    element: lazy(() => import("../modules/Admin/screens/Lab/ViewLab")),
  },
  {
    path: "/audit",
    element: lazy(() => import("../modules/Admin/audit/index")),
  },
  {
    path: "/audit/:id",
    element: lazy(() => import("../modules/Admin/audit/view")),
  },

  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Admin() {
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

export default Admin;
