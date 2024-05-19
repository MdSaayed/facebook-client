import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const Posts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('https://facebook-eight-dun.vercel.app/getAllPosts', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setPosts(data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch posts. Please try again later.");
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user]); // Include 'user' in the dependency array

    return (
        <div className="posts">
            {
                posts.map((post) => <Post key={post._id} post={post} user={user} />)
            }
        </div >
    );
};

export default Posts;
