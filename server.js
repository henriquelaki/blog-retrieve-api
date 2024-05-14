const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Middleware to parse JSON requests
app.use(express.json());

const fetchFromAPI = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw new Error('Error fetching data from external API');
    }
};

const getPosts = () => fetchFromAPI('posts');
const getUsers = () => fetchFromAPI('users');
const getComments = (postId) => fetchFromAPI(`posts/${postId}/comments`);

const findAuthorById = (users, userId) => users.find(user => user.id === userId);

const enrichPostWithDetails = async (post, users) => {
    const author = findAuthorById(users, post.userId);
    const comments = await getComments(post.id);
    return { ...post, user: author, comments };
};

const paginatePosts = (posts, startIndex, pageSize) => {
    const start = parseInt(startIndex, 10);
    const size = parseInt(pageSize, 10);
    return posts.slice(start, start + size);
};

app.get('/posts', async (req, res) => {
    const { start, size } = req.query;
    if (!start || !size) {
        return res.status(400).json({ error: 'Start and size query parameters are required' });
    }

    try {
        const [posts, users] = await Promise.all([getPosts(), getUsers()]);
        
        if (parseInt(start, 10) >= posts.length) {
            return res.status(404).json({ error: 'No posts found for the specified pagination parameters' });
        }

        const paginatedPosts = paginatePosts(posts, start, size);
        const detailedPosts = await Promise.all(paginatedPosts.map(post => enrichPostWithDetails(post, users)));

        res.status(200).json(detailedPosts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the blog posts' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
