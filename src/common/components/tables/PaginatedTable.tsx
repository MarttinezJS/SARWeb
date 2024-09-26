import { ReactNode, useEffect, useState } from "react";
import { get } from "../../services";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { Pagination } from "../../../models";
import { PaginationWithSize } from "./atomics/PaginationWithSize";
import { Column } from "./models/column";
import { useReloadTable } from "../../../hooks";

interface Action<T> {
  icon: ReactNode;
  label: string;
  action: (item: T) => void;
  visibleIf?: (item: T) => boolean;
  color?:
    | "secondary"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";
}

interface PaginatedTableProps<T> {
  endpoint: string;
  columns: Column<T>[];
  actions?: Action<T>[];
}

interface BasicObject {
  id: string;
}

export const PaginatedTable = <T extends BasicObject>({
  endpoint,
  columns,
  actions,
}: PaginatedTableProps<T>) => {
  const [list, setList] = useState<T[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const dependency = useReloadTable((s) => s.dependency);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async (endpoint: string) => {
    setIsLoading(true);
    const resp = await get<Pagination<T>>(
      `${endpoint}page=${page - 1}&size=${size}`
    );
    setIsLoading(false);
    if (resp.error || !resp.body) {
      setErrorMessage(resp.message);
      return;
    }
    setCount(resp.body.count);
    setList(resp.body.results);
  };
  useEffect(() => {
    getData(
      endpoint.includes("?") ? endpoint.concat(`&`) : endpoint.concat("?")
    );
  }, [endpoint, size, page, dependency]);

  return (
    <div>
      <Table>
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
                              <Tooltip
                                key={Math.random() * 100}
                                content={<p>{action.label}</p>}
                              >
                                <Button
                                  isIconOnly
                                  color={action.color ?? "primary"}
                                  variant="light"
                                  onPress={() => action.action(item)}
                                >
                                  {action.icon}
                                </Button>
                              </Tooltip>
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
      </Table>
      <PaginationWithSize
        count={count}
        page={page}
        setPage={setPage}
        setSize={setSize}
        size={size}
      />
    </div>
  );
};
