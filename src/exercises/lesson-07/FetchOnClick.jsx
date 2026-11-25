import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGetPost() {
    setLoading(true);
    setError(null);

    try {
      const data = await getSinglePost(1);
      setPost(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>

      <button className="button" type="button" onClick={handleGetPost}>
        Get post
      </button>

      <div className="content">
        {loading ? (
          <p>Loading post...</p>
        ) : error ? (
          <p>{error}</p>
        ) : post ? (
          <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </>
        ) : (
          <p>Click "Get post" to load a post.</p>
        )}
      </div>
    </div>
  );
}
