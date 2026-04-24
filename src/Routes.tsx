import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./common";
import { HomePage } from "./modules";

export const Routes = () => {
  //      const { isAuthenticated, verifySession } = useAuthentication();
  //   const protectLoader = async () =>
  //     isAuthenticated || (await verifySession())
  //       ? null
  //       : redirectDocument("/login");
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          Component: Layout,
          children: [
            {
              index: true,
              Component: HomePage,
            },
          ],
        },
      ])}
    />
  );
};
