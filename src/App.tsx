import { authProvider } from "./core";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout, Sidebar } from "./common/components";
import { Suspense, useEffect, useState } from "react";
import { About, Events, Home, Schedule, User } from "./modules";
import { ResponseModal } from "./common";
import { Devotional } from "./modules/devotional";
import { News } from "./modules/news";
import { Patterns } from "./modules/partterns";
import { ScheduleConfig } from "./modules/schedule";
import { EventsConfig } from "./modules/events";

const protectLoader = async () =>
  !authProvider.isAuthenticated && !(await authProvider.sessionValid())
    ? redirect("/")
    : null;

export const App = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  useEffect(() => {
    authProvider.sessionValid();
  }, []);

  return (
    <>
      <ResponseModal />
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements([
            <Route element={<Layout />}>
              <Route
                path="events"
                key={3}
                element={
                  <Suspense>
                    <Events />
                  </Suspense>
                }
              />
              <Route
                path="schedule"
                key={4}
                element={
                  <Suspense>
                    <Schedule />
                  </Suspense>
                }
              />
              <Route
                path="about"
                key={5}
                element={
                  <Suspense>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="user"
                key={6}
                element={
                  <>
                    <Sidebar setExpand={setSideMenuIsExpand} />
                    <div
                      className={`flex-1 min-h-full mx-0transition-all duration-300 ease-in-out  ${
                        sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
                      }`}
                    >
                      <Outlet />
                    </div>
                  </>
                }
                loader={protectLoader}
              >
                <Route path="" element={<Navigate to="config" />} />
                <Route
                  path="config"
                  key={7}
                  element={<User />}
                  loader={protectLoader}
                />
                <Route
                  path="news"
                  key={7}
                  element={<News />}
                  loader={protectLoader}
                />
                <Route
                  path="devotional"
                  key={7}
                  element={<Devotional />}
                  loader={protectLoader}
                />
                <Route
                  path="patterns"
                  key={7}
                  element={<Patterns />}
                  loader={protectLoader}
                />
                <Route
                  path="schedules"
                  key={7}
                  element={<ScheduleConfig />}
                  loader={protectLoader}
                />
                <Route
                  path="events"
                  key={7}
                  element={<EventsConfig />}
                  loader={protectLoader}
                />
              </Route>
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
