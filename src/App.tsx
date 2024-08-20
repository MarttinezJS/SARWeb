// import { authProvider } from "./core";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout, ResponseModal } from "./components";
import { Suspense } from "react";
import { About, Events, Schedule } from "./pages";
import { Home } from "./modules/home";

// const protectLoader = async () =>
//   !authProvider.isAuthenticated && (await authProvider.sessionValid())
//     ? redirect("/")
//     : null;

export const App = () => {
  return (
    <>
      <ResponseModal />
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements([
            <Route element={<Layout />}>
              <Route
                path="/events"
                key={4}
                element={
                  <Suspense>
                    <Events />
                  </Suspense>
                }
              />
              <Route
                path="/schedule"
                key={5}
                element={
                  <Suspense>
                    <Schedule />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                key={6}
                element={
                  <Suspense>
                    <About />
                  </Suspense>
                }
              />
            </Route>,
            <Route
              path="/"
              key={1}
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
              index={true}
              // loader={protectLoader}
            />,
            <Route path="/*" key={2} element={<Navigate to="/" />} />,
          ])
        )}
      />
    </>
  );
};
