import { Button, Flex } from '@mantine/core';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Flex display="flex" gap="xs">
      <Link href="/" passHref>
        <Button>Home</Button>
      </Link>
      <Link href="/users" passHref>
        <Button>Users</Button>
      </Link>
    </Flex>
  );
}
