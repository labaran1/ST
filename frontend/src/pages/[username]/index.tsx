import React from 'react';
import { useRouter } from 'next/router';
export default function Profile() {
  const router = useRouter();
  const { username } = router.query;
  return (
    <>
      <h1>Profile {username}</h1>
    </>
  );
}
