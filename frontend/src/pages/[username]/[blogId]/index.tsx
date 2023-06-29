import React from 'react';
import { useRouter } from 'next/router';
export default function ViewBlog() {
  const router = useRouter();
  const { username, blogId } = router.query;
  return (
    <div>
      blog for {username} blogId {blogId}
    </div>
  );
}
