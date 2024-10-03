import { kardex } from "@/types";
import { FC, useState } from "react";
import { DateFormated } from "@/components/shared/DateFormated";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { FilterHorizontalIcon, Search01Icon, ViewIcon } from "hugeicons-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Movements } from "@/components/shared/Movements";

// Column helper for Persons type
const columnHelper = createColumnHelper<kardex>();

interface Props {
  data: kardex[];
}

export const KardexManagmen: FC<Props> = ({ data }) => {
  const columns = [
    columnHelper.accessor("movementDate", {
      header: () => <span>Día Operation</span>,
      cell: (info) => <DateFormated date={info.getValue()} />,
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("product.name", {
      header: () => <span>productId</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("originStore.nombre", {
      header: () => <span>Tienda Origen</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("destinationStore.nombre", {
      header: () => <span>Tienda Destino</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("quantity", {
      header: () => <span>Cantidad</span>,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    columnHelper.accessor("movementType", {
      header: () => <span>Tipo movimiento</span>,
      cell: (info) => <Movements type={info.getValue()} />,
      footer: (info) => info.column.id,
      // enableResizing: true,
    }),
    // columnHelper.accessor(".name", {
    //   header: () => <span>Product</span>,
    //   cell: (info) => info.getValue(),
    //   footer: (info) => info.column.id,
    //   // enableResizing: true,
    // }),

    // columnHelper.accessor("updateAt", {
    //   header: () => <span>Updated At</span>,
    //   cell: (info) => <DateFormated date={info.getValue()} />,
    //   footer: (info) => info.column.id,
    //   // enableResizing: true,
    // }),
    // columnHelper.accessor("options", {
    //   header: () => <span>Actions</span>,
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <TooltipProvider>
    //         <Tooltip>
    //           <TooltipTrigger
    //             asChild
    //             className="cursor-pointer flex items-center"
    //           >
    //             <Link to={`/area/edit/${row.row.original.id}`}>
    //               <ViewIcon size={20} />
    //             </Link>
    //           </TooltipTrigger>
    //           <TooltipContent>
    //             <p>View</p>
    //           </TooltipContent>
    //         </Tooltip>
    //       </TooltipProvider>
    //       {/* <AreaDelete id={row.row.original.id} /> */}
    //     </div>
    //   ),
    //   footer: (info) => info.column.id,
    //   // cell: (row) => <PersonEdit id={row.row.original.id} />,
    //   // enableResizing: true,
    // }),
  ];

  // State for filtering
  const [filtering, setFiltering] = useState("");

  // State for column visibility
  const [columnVisibility, setColumnVisibility] = useState({});

  // State for pagination
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Table hook
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

  return (
    <div className="p-2">
      <div className="font-semibold text-xl p-4 flex justify-between">
        Inventory Detail
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
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
                  .map((column) => (
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
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative group"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* <div
                          {...{
                            onDoubleClick: header.getResizeHandler(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `${
                              header.column.getIsResizing() ? "isResizing" : ""
                            } absolute right-0 top-0 h-full w-1 bg-blue-500 cursor-col-resize group-hover:bg-blue-300`,
                          }}
                        /> */}
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
