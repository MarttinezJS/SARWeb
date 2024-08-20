import { authProvider } from "./core";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./common/components";
import { Suspense } from "react";
import { About, Events, Home, Schedule, User } from "./modules";
import { ResponseModal } from "./common";

const protectLoader = async () =>
  !authProvider.isAuthenticated && !(await authProvider.sessionValid())
    ? redirect("/")
    : null;

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
                key={3}
                element={
                  <Suspense>
                    <Events />
                  </Suspense>
                }
              />
              <Route
                path="/schedule"
                key={4}
                element={
                  <Suspense>
                    <Schedule />
                  </Suspense>
                }
              />
              <Route
                path="/about"
                key={5}
                element={
                  <Suspense>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/user"
                key={6}
                element={
                  <Suspense>
                    <User />
                  </Suspense>
                }
                loader={protectLoader}
              />
              <Route
                path="/"
                key={1}
                element={
                  <Suspense>
                    <Home />
                  </Suspense>
                }
                index={true}
              />
              ,
            </Route>,
            <Route path="/*" key={2} element={<Navigate to="/" />} />,
          ])
        )}
      />
    </>
  );
};
