import { lazy } from "react";

const BaseRoutes = [
  {
    path: `/*`,
    component: lazy(() => import("./AuthRouter")),
    useAuth: false,
  },
  {
    path: "/app/*",
    component: lazy(() => import("./AdminRouter")),
    useAuth: true,
    allowedRoles: [
      "Requester",
      "Doctor",
      "Lab",
      "MedicalDispatcher",
      "SampleCollectionExpert",
      "Admin",
    ],
  },
  {
    path: "/app/doctor/*",
    // exact: true,
    component: lazy(() => import("./DoctorRouter")),
    useAuth: true,
    allowedRoles: ["Doctor"],
  },
  {
    path: "/app/admin/*",
    // exact: true,
    component: lazy(() => import("./Admin")),
    useAuth: true,
    allowedRoles: ["Admin"],
  },
  {
    path: "/app/collector/*",
    // exact: true,
    component: lazy(() => import("./CollectorRouter")),
    useAuth: true,
    allowedRoles: ["SampleCollectionExpert"],
  },
  {
    path: "/app/dispatcher/*",
    // exact: true,
    component: lazy(() => import("./DispatherRouter")),
    useAuth: true,
    allowedRoles: ["MedicalDispatcher"],
  },
  {
    path: "/app/lab/*",
    // exact: true,
    component: lazy(() => import("./LabRouter")),
    useAuth: true,
    allowedRoles: ["Lab"],
  },
  {
    path: "/app/patient/*",
    // exact: true,
    component: lazy(() => import("./PatientRouter")),
    useAuth: true,
    allowedRoles: ["Requester"],
  },
  {
    path: "*",
    component: lazy(() => import("../modules/NotFound")),
    useAuth: false,
  },
];

export default BaseRoutes;
