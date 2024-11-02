import { Suspense, useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  redirect,
} from "react-router-dom";
import { Events, Schedule, About, Home, User } from "../../../modules";
import { Devotionals } from "../../../modules/devotional";
import { EventsConfig } from "../../../modules/events";
import { News } from "../../../modules/news";
import { Patterns } from "../../../modules/partterns";
import { ScheduleConfig } from "../../../modules/schedule";
import { Layout } from "./Layout";
import { Sidebar } from "./Sidebar";
import { authProvider } from "../../../core";

export const Router = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const { isAuthenticated, sessionValid } = authProvider();
  const protectLoader = async () =>
    !isAuthenticated && !(await sessionValid()) ? redirect("/") : null;
  useEffect(() => {
    sessionValid();
  }, []);

  return (
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
                element={<Devotionals />}
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
  );
};
