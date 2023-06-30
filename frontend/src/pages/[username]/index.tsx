import React from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/utils/apiaxios';
import useSWR from 'swr';

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <h1>Profile {username}</h1>
    </div>
  );
}
