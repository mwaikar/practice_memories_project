import React, {useState} from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, CircularProgress } from '@material-ui/core';
import ThumbUpAlticon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
    const [likeLoading, setLikeLoading] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const updateLikePosts = (postId) => {
        setLikeLoading(true);
        dispatch(likePost(postId)).then(() => {
            setLikeLoading(false);
        });
    };
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{color: 'white'}}
                    size="small"
                    onClick={() => setCurrentId(post._id)}
                    alt="Edit Memory"
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >
                    {post.tags.split(',').map(tag => `#${tag.trim()}`).join(', ')}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => updateLikePosts(post._id)} >
                    <ThumbUpAlticon fontSize="small" />
                    Like
                    {
                        likeLoading ? <CircularProgress size={15} /> : post.likeCount
                    }
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} >
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>

        </Card>
    )
}

export default Post;