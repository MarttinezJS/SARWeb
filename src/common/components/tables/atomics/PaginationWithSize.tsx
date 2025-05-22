import { Pagination, Select, SelectItem } from "@heroui/react";
interface PaginationWithSizeProps {
  count: number;
  size: number;
  page: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export const PaginationWithSize = ({
  count,
  page,
  setPage,
  setSize,
  size,
}: PaginationWithSizeProps) => {
  return (
    <div className="flex w-full p-2 justify-center items-center">
      <Pagination
        isCompact
        showShadow
        showControls
        total={Math.ceil(count / size)}
        page={page}
        onChange={(currentPage) => {
          setPage(currentPage);
        }}
      />
      <div className="min-w-16 mx-2">
        <Select
          selectionMode="single"
          defaultSelectedKeys={["5"]}
          disallowEmptySelection
          onSelectionChange={(key) => {
            const currentKey = key.currentKey;
            currentKey && setSize(Number.parseInt(currentKey));
            setPage(1);
          }}
        >
          {["2", "5", "10", "20", "50"].map((number) => (
            <SelectItem hideSelectedIcon key={number}>
              {number}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
