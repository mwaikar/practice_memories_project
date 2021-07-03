import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getPosts = async (req, res) => {
    const {page} = req.query;
    try {
        const LIMIT_PER_PAGE = 4;
        const startIndex = (Number(page) - 1) * LIMIT_PER_PAGE; // get the starting index of every page
        const total = await PostMessage.countDocuments({});

        /**
         * id = -1 gives the newest post first
         * skip is used to exclude all posts from current-1 page to the 1st post.
         * for eg , if we are on 2nd page, we need to exclude all the posts before 2nd page up till 1st post. 
         */
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT_PER_PAGE).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT_PER_PAGE)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// eg /posts/123 <- this is the id

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    // check if _id is a mongoose object 
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    // here {new: true} determines that mongodb needs to send the updated post
    const updatedpost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedpost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with this id');

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex(id => id === String(req.userId)); // check if post is already liked by user
    if (index === -1) {
        post.likes.push(req.userId); // like
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId)); // dislike
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);

}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { commentValue } = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(commentValue);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}