import CustomTable from '@/components/organisms/Table';
import { fetcher } from '@/utils/httpClient';
import useSWR from 'swr';
import { Modal, Button, Loader, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, UseFormReturnType } from '@mantine/form';
import { User } from '@/types/User';
import { createUser, deleteUser, updateUser } from '@/services/users.service';
import UserForm from '@/components/organisms/UserForm';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function UsersPage() {
  const { data, error, isLoading } = useSWR('/users', fetcher);
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const form: UseFormReturnType<User> = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      name: '',
      email: '',
      birthday: new Date(),
      gender: '',
      createdAt: new Date(),
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Invalid name'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      birthday: (value) => (value ? null : 'Invalid birthday'),
      gender: (value) => (value ? null : 'Invalid gender'),
    },
  });

  async function handleSubmit(values: any) {
    values.birthday = new Date(values.birthday).toISOString();
    try {
      if (isEditingUser) {
        console.log(values);
        await updateUser(values);
      } else {
        values.id = data.length + 1;
        values.createdAt = new Date().toISOString();
        await createUser(values);
      }
      close();
    } catch (ex: any) {
      console.log(ex.message);
      notifications.show({
        color: 'red',
        title: 'Error!',
        message: ex.message,
      });
    }
  }
  if (error) {
    notifications.show({
      color: 'red',
      title: 'Error!',
      message: 'Something went wrong getting users data.',
    });
  }
  if (isLoading) return <Loader color="blue" />;

  function handleEdit(user: User) {
    setIsEditingUser(true);
    form.setValues({
      id: user.id,
      name: user.name,
      email: user.email,
      birthday: new Date(user.birthday),
      gender: user.gender,
      createdAt: new Date(user.createdAt),
    });
    open();
  }

  function handleAdd() {
    form.setValues({
      id: undefined,
      name: '',
      email: '',
      birthday: undefined,
      gender: '',
      createdAt: undefined,
    });
    open();
    setIsEditingUser(false);
  }

  function handleDelete(user: User) {
    setUserToDelete(user);
    openDeleteModal();
  }

  async function confirmDelete() {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
    }
    closeDeleteModal();
  }
  return (
    <>
      <h1>Users Page</h1>
      <Button onClick={handleAdd}>Add User</Button>
      <CustomTable data={data} editHandler={handleEdit} deleteHandler={handleDelete} />
      <Modal
        opened={opened}
        onClose={close}
        title={isEditingUser ? 'Edit User' : 'Add User'}
        centered
      >
        <UserForm form={form} handleSubmit={handleSubmit} />
      </Modal>
      <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="Delete User" centered>
        <Text>Are you sure you want to delete this user?</Text>
        <Group position="right" mt="md">
          <Button onClick={closeDeleteModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
