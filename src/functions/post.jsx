
import axios from "axios";

export const createPost = async (type, background, text, images, user, token) => {
    try {
        const { data } = await axios.post(`http://localhost:8000/createPost`, {
            type, background, text, images, user
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return {status:"ok",data};
    } catch (error) {
        return error.response.data.message;
    }
}
export const reactPost = async (postId, react, token) => {
    try {
        const { data } = await axios.put(`http://localhost:8000/reactPost`, {
            postId, react,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return "ok";
    } catch (error) {
        return error.response.data.message;
    }
}

export const getReacts = async (postId, token) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/getReacts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An error occurred while fetching reacts.';
        }
    }
};
export const comment = async (postId, comment, image, token) => {
    try {
        const { data } = await axios.put(`http://localhost:8000/comment`, {
            postId,
            comment,
            image,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An error occurred while fetching reacts.';
        }
    }
};
export const savePost = async (postId,   token) => {
    try {
        const { data } = await axios.put(`http://localhost:8000/savePost/${postId}`, {
            
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An error occurred while fetching reacts.';
        }
    }
};

export const deletePost = async (postId, token) => {
    try {
        const { data } = await axios.delete(`http://localhost:8000/deletePost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error('Error deleting post:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An error occurred while deleting the post.';
        }
    }
};


