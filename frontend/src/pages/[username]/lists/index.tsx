import React from 'react';
import { useRouter } from 'next/router';

const ReadingList = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <>
      <h1>Reading List for {username}</h1>
    </>
  );
};

export default ReadingList;
