import { Link, useNavigate } from "react-router-dom";
import { useResponseModalStore } from "../../../hooks";
import { useEffect, useState } from "react";
import { User } from "../../../models";
import { authProvider, httpClient } from "../../../core";
import { Endpoints } from "../../endpoints";
// @ts-ignore
import SimpleBar from "simplebar-react";
import { Avatar, Button } from "@heroui/react";
import { routes } from "../../../config/routes";
import { GenerateMenu } from "../atomics";
import { FaArrowCircleLeft } from "react-icons/fa";

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

export const Sidebar = ({ setExpand }: SidebarProps) => {
  const showResponse = useResponseModalStore((s) => s.showModal);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [isExpandOnHover, setIsExpandOnHover] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const [activeName, setActiveName] = useState("");
  const { userData, logout } = authProvider();
  const getUser = async () => {
    try {
      const resp = await httpClient.get(`${Endpoints.USERS}/${userData?.id}`);
      const body = resp.data.body;
      if (body == null) {
        showResponse(resp.data);
        return;
      }
      setUser(body);
    } catch (error) {}
  };
  const handleHoverExpand = (value: boolean) => {
    if (!isExpand) {
      setIsExpandOnHover(value);
    }
  };

  useEffect(() => {
    userData?.id && getUser();
    const routesNames = location.pathname.split("/");
    setActiveName(routesNames[routesNames.length - 1]);
  }, []);

  return (
    <nav
      role="navigation"
      className={[
        "bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0 hidden sm:block",
        "duration-300 ease-in-out md:fixed md:translate-x-0",
        `${
          isExpand
            ? "bg-slate-50 w-72"
            : isExpandOnHover
            ? "bg-slate-50/70 w-72 backdrop-blur-md"
            : "bg-slate-50 w-20"
        }`,
      ].join(" ")}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            isExpand ? "rotate-0" : "rotate-180"
          } transform duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        onMouseEnter={() => handleHoverExpand(true)}
        onMouseLeave={() => handleHoverExpand(false)}
        className={`relative h-screen overflow-hidden bg-background`}
      >
        <SimpleBar style={{ height: "100%", paddingTop: "50px" }} autoHide>
          <div className="text-slate-500">
            <div className="my-8 flex flex-col items-center h-48 overflow-x-hidden">
              <Link
                to={`config`}
                onClick={() => {
                  setActiveName("config");
                }}
                className={`text-center flex flex-col items-center justify-center`}
              >
                <div
                  className={`rounded-full border-4 border-white overflow-hidden duration-300 ${
                    isExpand
                      ? "h-28 w-28"
                      : isExpandOnHover
                      ? "h-28 w-28"
                      : "h-12 w-12"
                  }`}
                >
                  <Avatar
                    name={`${user?.firstName?.charAt(
                      0
                    )}${user?.lastName?.charAt(0)}`}
                    isBordered
                    color={activeName == "config" ? "primary" : "default"}
                    className="w-full h-full text-large text-secondary"
                  />
                </div>
                <div
                  className={`text-base font-semibold text-secondary mt-3 truncate duration-300 ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  {`${user?.firstName} ${user?.lastName}`}
                </div>
                <div
                  className={`duration-300 text-sm text-secondary truncate ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  {user?.email}
                </div>
                <div
                  className={`duration-300 text-sm text-secondary truncate ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  {user?.role}
                </div>
              </Link>
            </div>

            <div className="mt-3 mb-10 p-0">
              <ul className="list-none text-sm font-normal px-3">
                {routes.map((item, index) => (
                  <GenerateMenu
                    key={index}
                    activeName={activeName}
                    setActiveName={setActiveName}
                    index={index}
                    isExpand={isExpand}
                    isExpandOnHover={isExpandOnHover}
                    item={item}
                  />
                ))}
              </ul>
            </div>
            <div className="px-3 place-self-end">
              <Button
                color="danger"
                startContent={<FaArrowCircleLeft />}
                variant="light"
                className={`duration-300 text-sm truncate ${
                  isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                }`}
                onPress={() => {
                  logout();
                  navigate("/");
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};
