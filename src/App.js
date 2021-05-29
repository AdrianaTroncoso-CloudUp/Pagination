import React, {useState, useEffect} from 'react';
import Posts from './components/Posts';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  const[currentPage, setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  },[]);

  //Get current posts
    const indexOfLastPost = currentPage *postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    const columns = [
      { field: 'posts', headerName: 'Posts', width: 270 }
    ];
  
    const rows = [
      {posts: currentPosts}
    ];

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
    </div>

  );
}

export default App;
