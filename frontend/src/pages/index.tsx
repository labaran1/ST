import React from 'react';
import Styles from '../styles/Home.module.css';
import { fetcher } from '@/utils/apiaxios';
import useSWR from 'swr';

export default function Home() {
  const { data, error, isLoading } = useSWR('/blogs', fetcher);

  console.log(data, 'blogs');
  return (
    <div>
      <div>{/* nav */}</div>

      <div>{/*  feed tabs */}</div>

      <h1 style={{}}>All Blogs</h1>
      <div style={{ marginTop: '5rem' }}>
        {/* feeds */}
        {isLoading ? (
          <>
            <h1>Loading ....</h1>
          </>
        ) : error ? (
          <>
            <h1>An error occured</h1>
          </>
        ) : data ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {data.map((blog) => (
              <div
                key={blog._id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  padding: '1rem',
                  margin: '1rem',
                  borderRadius: '5px',
                  boxShadow: '0 0 5px #ccc',
                  width: '40%',
                }}
              >
                <p style={{ fontWeight: 500 }}>{blog.title}</p>
                <p style={{ color: '#4e4e4e' }}>
                  {blog.body.substr(1, 100)}...
                </p>
                <div style={{ display: 'flex' }}>
                  {blog.tags.map((tag: string) => (
                    <p key={tag} style={{ color: '#ddd' }}>
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>something went wrong</>
        )}
      </div>
    </div>
  );
}
