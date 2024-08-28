import { ColumnDef, Row } from '@tanstack/react-table';
import { Group, Badge, Progress, Button } from '@mantine/core';
import { useMemo, useState } from 'react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import ReusableTable from '@/components/organisms/Table';

type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};
const usersData: User[] = Array.from({ length: 200 }, (_, index) => ({
  firstName: `FirstName${index + 1}`,
  lastName: `LastName${index + 1}`,
  age: Math.floor(Math.random() * 50) + 20,
  visits: Math.floor(Math.random() * 500),
  progress: Math.floor(Math.random() * 101),
  status: Math.random() > 0.5 ? 'Married' : 'Single',
}));

// Add the original two entries at the beginning of the array
usersData.unshift(
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 33,
    visits: 100,
    progress: 50,
    status: 'Married',
  },
  {
    firstName: 'Kevin',
    lastName: 'Vandy',
    age: 27,
    visits: 200,
    progress: 100,
    status: 'Single',
  }
);
function Index() {
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
      },
      {
        header: 'Age',
        accessorKey: 'age',
        cell: ({ getValue }: { getValue: () => number }) => (
          <Badge color={getValue() < 30 ? 'green' : 'blue'}>{getValue()}</Badge>
        ),
      },
      {
        header: 'Visits',
        accessorKey: 'visits',
        cell: ({ getValue }: { getValue: () => number }) => (
          <span style={{ fontWeight: 'bold', color: getValue() > 200 ? 'green' : 'inherit' }}>
            {getValue()}
          </span>
        ),
      },
      {
        header: 'Progress',
        accessorKey: 'progress',
        cell: ({ getValue }: { getValue: () => number }) => (
          <Progress value={getValue()} color="blue" size="sm" />
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }: { getValue: () => string }) => (
          <Badge color={getValue() === 'Married' ? 'pink' : 'violet'}>{getValue()}</Badge>
        ),
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: Row<User> }) => (
          <Group gap="xs">
            <Button
              size="xs"
              color="green"
              variant="outline"
              onClick={() => console.log(row.original)}
            >
              <IconEye />
            </Button>
            <Button size="xs" variant="outline">
              <IconEdit />
            </Button>
            <Button size="xs" color="red" variant="outline">
              <IconTrash />
            </Button>
          </Group>
        ),
      },
    ],
    []
  );
  const [data] = useState(usersData);
  return (
    <>
      <ReusableTable columns={columns} data={data} pageSize={10} />
    </>
  );
}

export default Index;
