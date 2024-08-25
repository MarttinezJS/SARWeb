import { useEffect, useRef, useState } from "react";
import { Route } from "../../../models";
import { authProvider } from "../../../core";
import { Link } from "react-router-dom";

interface GenerateMenuProps {
  isExpand: boolean;
  isExpandOnHover: boolean;
  item: Route;
  index: number;
  recursive?: number;
  setActiveName: (path: string) => void;
  activeName: string;
}

export const GenerateMenu = ({
  activeName,
  index,
  isExpand,
  isExpandOnHover,
  item,
  setActiveName,
  recursive = 0,
}: GenerateMenuProps) => {
  const activeLink = window.location.pathname;
  const classesActive = activeName === item.id ? "active" : "";
  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const listRef = useRef<Record<string, HTMLUListElement | null>>({});
  const handleNavigate = (path: string) => setActiveName(path);

  const handleToggle = (name: string) => {
    const rootEl = name.split(".")[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: "0px",
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) -
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`,
        },
        [rootEl]: {
          open: true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) +
            (listRef.current[name]?.scrollHeight || 0)
          }px`,
        },
      }));
    }
  };
  useEffect(() => {
    if (activeName === "" && activeLink.includes(item.id)) {
      setActiveName(item.id);
    }
  }, []);

  return (
    (item.roles != "ADMIN" || authProvider.userData?.role == "ADMIN") && (
      <li key={index}>
        <Link
          to={`./${item.id}`}
          role="button"
          tabIndex={0}
          id={item.id}
          onClick={() => {
            if ("child" in item) {
              handleToggle(item.id);
            } else if ("link" in item) {
              handleNavigate(item.id);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Space") {
              if ("child" in item) {
                handleToggle(item.id);
              } else if ("link" in item) {
                handleNavigate(item.id);
              }
            }
          }}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.id || activeName.split(".")[0] === item.id
              ? `text-secondary font-semibold ${
                  item.parent ? "bg-blue-200/20 " : "bg-transparent"
                }`
              : `text-slate-500 ${item.parent && ""}`,
            "hover:bg-slate-300/20",
            classesActive,
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <div
              className={`truncate ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              {item.title}
            </div>
          </div>
          {"child" in item ? (
            <div
              className={`${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </Link>
        {"child" in item ? (
          <ul
            ref={(el) => (listRef.current[item.id] = el)}
            className={[
              "overflow-hidden duration-300 ease-in-out",
              isExpand ? "" : isExpandOnHover ? "" : "h-0",
            ].join(" ")}
            style={{ maxHeight: `${openedMenu[item.id]?.height || "0px"}` }}
            key={item.id}
          >
            {item.child?.map((value: any, idx: number) => (
              <GenerateMenu
                index={idx}
                activeName={activeName}
                setActiveName={setActiveName}
                isExpand={isExpand}
                isExpandOnHover={isExpandOnHover}
                item={value}
                recursive={recursive + 1}
              />
            ))}
          </ul>
        ) : (
          false
        )}
      </li>
    )
  );
};
