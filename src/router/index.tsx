import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ReactNode, lazy } from "react";
import RouterMenu from "../pages/RouterMenu/index.tsx";
import routers from "./routers.ts";
import { RouteItem } from "./type.ts";
import useErrorBoundary from "../hooks/useErrorBoundary.ts";
// import Home from "../pages/Home/index.tsx";
const lazyLoader = ((name: string): ReactNode => {  
  // "../pages/Home/index.tsx";
  const Lazy = lazy(() => import(`../pages/${name}/index.tsx`))
  return <Lazy />
})

const getRouter = (routers: RouteItem[]): ReactNode => {
  return routers.map((item) => {
    if (item.children) {
      return getRouter(item.children)
    }
    return <Route
      element={lazyLoader(item.name)}
      path={item.path}
      key={`${item.name}+${item.path}`}
    />
  })
}

const elements = getRouter(routers)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouterMenu />} ErrorBoundary={useErrorBoundary}>
      {elements}
    </Route>,
    // <Route
    //   element={<Team />}
    //   path="teams/:teamId"
    //   loader={async ({ params }) => {
    //     return fetch(
    //       `/fake/api/teams/${params.teamId}.json`
    //     );
    //   }}
    //   action={async ({ request }) => {
    //     // return updateFakeTeam(await request.formData());
    //   }}
    //   errorElement={<ErrorBoundary />}
    // />
  )
);
export default router