import React, { useState } from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CircularProgress, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory, Link } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const [likeLoading, setLikeLoading] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const updateLikePosts = (postId) => {
        setLikeLoading(true);
        dispatch(likePost(postId)).then(() => {
            setLikeLoading(false);
        });
    };

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase component="span" name="postCard" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6" >{post.name}</Typography>
                    <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <div className={classes.overlay2}>
                            <Button
                                style={{ color: 'white' }}
                                size="small"
                                onClick={() => setCurrentId(post._id)}
                                alt="Edit Memory"
                            >
                                <MoreHorizIcon fontSize="default" />
                            </Button>
                        </div>
                    )
                }
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" >
                        {/* {post.tags.map(tag => `#${tag.trim()} `)} */}

                        {post.tags.map(tag => (
                            <Link className={classes.tagLinks} key={tag} to={`/posts/search?searchQuery=none&tags=${tag}`}>{`#${tag.trim()} `}</Link>
                        ))}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                        {
                            post.message.length >= 100 ? `${post.message.substring(0, 50)}...` : post.message
                        }
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => updateLikePosts(post._id)} >
                    <Likes />
                    {
                        likeLoading ? <CircularProgress size={15} /> : post.likeCount
                    }
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} >
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    )
                }
            </CardActions>

        </Card>
    )
}

export default Post;