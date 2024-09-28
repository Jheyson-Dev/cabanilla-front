import { DateFormated } from "@/components/shared/DateFormated";
import { StatusIndicator } from "@/components/shared/StatusIndicator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "@/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import {
  Delete02Icon,
  FilterHorizontalIcon,
  MoreHorizontalIcon,
  PencilEdit02Icon,
  Search01Icon,
  ViewIcon,
} from "hugeicons-react";
import { useState } from "react";

// DEFINICION DE LAS COLUMNAS
const columnHelper = createColumnHelper<Users>();

interface UserManagmentProps {
  data: Users[];
}

export const UserManagment: React.FC<UserManagmentProps> = ({ data }) => {
  //  DEFINICION DE LAS COLUMNAS
  const columns = [
    columnHelper.accessor("username", {
      header: () => <span className="flex justify-center">Username</span>,

      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      enableResizing: true,
    }),
    columnHelper.accessor("status", {
      header: () => <span className="flex justify-center">status</span>,

      // cell: (info) => info.getValue(),
      cell: (info) => <StatusIndicator status={info.getValue()} />,
      footer: (info) => info.column.id,
      enableResizing: true,
    }),
    columnHelper.accessor("createdAt", {
      header: () => <span className="flex justify-center">createdAt</span>,

      cell: (info) => <DateFormated date={info.getValue()} />,
      footer: (info) => info.column.id,
      enableResizing: true,
    }),
    columnHelper.accessor("updatedAt", {
      header: () => <span className="flex justify-center">updatedAt</span>,

      cell: (info) => <DateFormated date={info.getValue()} />,
      footer: (info) => info.column.id,
      enableResizing: true,
    }),
    columnHelper.accessor("options", {
      header: () => <span className="flex justify-center">Actions</span>,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=" ">
            <div className="flex justify-center">
              <Button variant="outline" className="justify-between">
                <MoreHorizontalIcon className="h-4 w-4 opacity-50" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleView} className="cursor-pointer">
              <ViewIcon className="mr-2 h-4 w-4" />
              <span>View</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <PencilEdit02Icon className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
              <Delete02Icon className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      footer: (info) => info.column.id,
      enableResizing: true,
    }),
  ];

  //  ESTADO PARA LAS COLUMNAS FILTRADAS
  const [filtering, setFiltering] = useState("");

  //  ESTADO PARA LAS COLUMNAS VISIBLES
  const [columnVisibility, setColumnVisibility] = useState({});

  //  ESTADO PAR ALA PAGINACION
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  //  HOOK DE TABLA
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      columnVisibility,
      pagination,
    },
    onGlobalFilterChange: setFiltering,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  // FUNCIONES PARA LOS BOTONES DE ACCION
  const handleView = () => {
    console.log("View action triggered");
    // Implement view logic here
  };

  const handleEdit = () => {
    console.log("Edit action triggered");
    // Implement edit logic here
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
    // Implement delete logic here
  };

  return (
    <div className="p-2">
      <div className="font-semibold text-xl p-4 flex justify-between">
        User Managment
        <div className=" flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-10"
              value={filtering}
              onChange={(e) => {
                setFiltering(e.target.value);
              }}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filter <FilterHorizontalIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className={`relative group`}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div
                          {...{
                            onDoubleClick: header.getResizeHandler(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `${
                              header.column.getIsResizing() ? "isResizing" : ""
                            } absolute right-0 top-0 h-full w-1 bg-blue-500 cursor-col-resize group-hover:bg-blue-300`,
                          }}
                        />
                      </>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
