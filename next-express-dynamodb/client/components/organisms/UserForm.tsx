import { User } from '@/types/User';
import { Button, Group, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';

function UserForm({
  form,
  handleSubmit,
}: {
  form: UseFormReturnType<any>;
  handleSubmit: (values: Partial<User>) => void;
}) {
  return (
    <form onSubmit={form.onSubmit((values: Partial<User>) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <DateInput
        withAsterisk
        label="Birthday"
        placeholder="Birthday"
        key={form.key('birthday')}
        {...form.getInputProps('birthday')}
      />
      <Select
        withAsterisk
        label="Gender"
        placeholder="Gender"
        key={form.key('gender')}
        data={['Male', 'Female']}
        {...form.getInputProps('gender')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

export default UserForm;
