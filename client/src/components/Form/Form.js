import React, {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: [], selectedFile: ''
    });
    const post = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId): null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}, history));
        }
        clear();
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: [], selectedFile: ''});
    };

    if (!user?.result?.name) {
        return (
            <Paper className={`${classes.paper} ${classes.addMargin}`} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create your memories and like others' memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="false" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing': 'Creating'}   a Memory</Typography>
                <TextField
                    name="Title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField
                    name="Message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField
                    name="Tags"
                    variant="outlined"
                    label="Tags (comma seperated)"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="Submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;