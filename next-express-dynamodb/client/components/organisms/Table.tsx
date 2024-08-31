import { User } from '@/types/User';
import { Table, Button, ActionIcon, Flex } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
export default function CustomTable({
  data,
  editHandler,
  deleteHandler,
}: {
  data: any[];
  editHandler: (user: User) => void;
  deleteHandler: (user: User) => void;
}) {
  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.birthday}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>
        <Flex gap={5}>
          <ActionIcon color="blue" variant="outline" onClick={() => editHandler(element)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon color="red" variant="outline" onClick={() => deleteHandler(element)}>
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Birthday</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Created At</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
