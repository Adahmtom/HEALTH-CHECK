import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const paths = [
  {
    path: "/appointment/available",
    element: lazy(() => import("../modules/Collector/availableCollection")),
  },
  {
    path: "/appointment/available/:id",
    element: lazy(() => import("../modules/Collector/checklist")),
  },
  {
    path: "/collection/all",
    element: lazy(() => import("../modules/Collector/screens/TotalCollection")),
  },
  {
    path: "/collection/pending",
    element: lazy(() =>
      import("../modules/Collector/screens/PendingCollection")
    ),
  },
  {
    path: "/collection/completed",
    element: lazy(() =>
      import("../modules/Collector/screens/CompletedCollection")
    ),
  },
  {
    path: "/collection/:id",
    element: lazy(() => import("../modules/Collector/screens/ViewCollection")),
  },
  {
    path: "/pending/collection/:id",
    element: lazy(() => import("../modules/Collector/sampleInput")),
  },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function CollectorRouter() {
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

export default CollectorRouter;
