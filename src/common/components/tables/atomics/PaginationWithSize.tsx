import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";

interface PaginationWithSizeProps {
  count: number;
  size: number;
  page: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  sizes?: number[];
}

/** Paginador con total de registros y selector de filas por página. */
export const PaginationWithSize = ({
  count,
  size,
  page,
  setPage,
  setSize,
  sizes = [5, 10, 20, 50],
}: PaginationWithSizeProps) => {
  const total = Math.max(1, Math.ceil(count / size));
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 pt-3">
      <p className="text-sm text-muted">
        {count === 1 ? "1 registro" : `${count} registros`}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Select
          aria-label="Filas por página"
          size="sm"
          variant="bordered"
          className="w-24"
          classNames={{ trigger: "bg-white" }}
          disallowEmptySelection
          selectedKeys={[String(size)]}
          onSelectionChange={(keys) => {
            if (keys.currentKey) setSize(Number.parseInt(keys.currentKey, 10));
          }}
        >
          {sizes.map((value) => (
            <SelectItem key={String(value)} textValue={String(value)}>
              {value}
            </SelectItem>
          ))}
        </Select>
        {total > 1 && (
          <Pagination
            aria-label="Paginación"
            isCompact
            showControls
            size="sm"
            color="secondary"
            total={total}
            page={page}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
