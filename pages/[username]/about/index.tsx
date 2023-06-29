import React from 'react';
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();
  const { username } = router.query;
  return <div>{username} About</div>;
}
