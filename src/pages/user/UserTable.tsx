import { createColumnHelper } from "@tanstack/react-table";

type User = {
  id: number;
  username: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

const columnHelper = createColumnHelper<User>();

const defaultColumns = [
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      <div>option</div>;
    },
  }),

//   Gruoping columns
  columnHelper.group({
    header:""
  })
];

export const UserTable = () => {
  return;
};
