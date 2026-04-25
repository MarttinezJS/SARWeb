// import { useState } from "react";
// import { get } from "../../services";
// import { Pagination } from "../../../models";
import { PaginationWithSize } from "./atomics/PaginationWithSize";
// import { Column } from "./models/column";
// import { useReloadTable } from "../../../hooks";
// import { Action } from "./models";
// import { ActionButton } from "./atomics";

// interface PaginatedTableProps<T> {
//   endpoint: string;
//   columns: Column<T>[];
//   actions?: Action<T>[];
// }

// interface BasicObject {
//   id: string;
// }

export const PaginatedTable = () => {
  // const [list, setList] = useState<T[]>([]);
  // const [errorMessage, setErrorMessage] = useState<string>();
  // const dependency = useReloadTable((s) => s.dependency);
  // const [count] = useState(1);
  // const [page, setPage] = useState(1);
  // const [size, setSize] = useState(10);
  // const [isLoading, setIsLoading] = useState(false);
  // const getData = useCallback( (endpoint: string) => {
  //   setIsLoading(true);
  //   const resp = get<Pagination<T>>(
  //     `${endpoint}page=${page - 1}&size=${size}`
  //   );
  //   return resp
  //   setIsLoading(false);
  //   if (resp.error || !resp.body) {
  //     setErrorMessage(resp.message);
  //     return;
  //   }
  //   setCount(resp.body.count);
  //   setList(resp.body.results);
  // },[page, size]);
  // useEffect(() => {
  //   getData(
  //     endpoint.includes("?") ? endpoint.concat(`&`) : endpoint.concat("?")
  //   );
  // }, [endpoint, size, page, dependency, getData]);

  return (
    <div>
      {/* <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.id}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={list}
          isLoading={isLoading}
          emptyContent={
            <div className="flex justify-center items-center p-5">
              <p className="text-3xl text-gray-400">{errorMessage}</p>
            </div>
          }
        >
          {(item) => (
            <TableRow>
              {(columnKey) => {
                const column = columns.find((c) => c.id == columnKey);
                if (column && column.render != undefined) {
                  return <TableCell>{column.render(item)}</TableCell>;
                }
                let child;
                switch (columnKey) {
                  case "actions":
                    child = (
                      <div>
                        {actions?.map(
                          (action) =>
                            !action.visibleIf ||
                            (action.visibleIf(item) && (
                              <ActionButton
                                action={async () => await action.action(item)}
                                color={action.color ?? "primary"}
                                icon={action.icon}
                                label={action.label}
                              />
                            ))
                        )}
                      </div>
                    );
                    break;
                  default:
                    child = getKeyValue(item, columnKey);
                    break;
                }
                return <TableCell>{child}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table> */}
      <PaginationWithSize
      // count={count}
      // page={page}
      // setPage={setPage}
      // setSize={setSize}
      // size={size}
      />
    </div>
  );
};
