import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddTags = (tag) => setTags([...tags, tag]);

    const handleDeleteTags = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({searchQuery: search, tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name="Search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAddTags}
                                onDelete={handleDeleteTags}
                                label="Search Tag"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {
                            (!search && !tags.length) && (
                                <Paper elevation={6}>
                                    <Pagination page={page} className={classes.pagination} />
                                </Paper>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
