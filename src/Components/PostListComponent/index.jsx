import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash'
import { Table, Menu, Button, Grid, Input, Header, Icon, Search } from 'semantic-ui-react';
import ApplicationContext from "../../Contexts";
import { useHistory } from 'react-router-dom';


export default function PostListComponent() {
    const history = useHistory();

    const {
        fetchPostList,
        postList, 
        userMap,
        fetchUserMap,
        setCurrentPost,
        setCurrentUser
    } = useContext(ApplicationContext);

    const [searchResult, setResult] = useState([]);
    const [searchValue, setValue] = useState("");


    useEffect(() => {
        if (!postList.length) {
            fetchPostList();
            fetchUserMap();
        }
    }, [])

    const redirectPost = (post) => {
        setCurrentPost(post);
        history.push("/post");
    }

    const redirectUser = (user) => {
        if (user) {
            setCurrentUser(user);
            history.push("/user");
        }
    }

    const userList = Object.values(userMap).map(user => ({ title: user.name }));

    const onSearchChange = (e, data) => {
        setValue(data.value);
        const re = new RegExp(_.escapeRegExp(data.value), 'i');
        const isMatch = (result) => re.test(result.title);
        const results = _.filter(userList, isMatch);
        setResult(results);
    }
    const onResultSelect = (e, data) => {
        setValue(data.result?.title)
    }

    return (
        <Grid className={"table-default"}>
            <Grid.Column width={16}>
                <Grid.Row className={"table-default"}>
                    <Header as="h1" floated='left'>
                        Posts
                        </Header>
                    <Header floated='right'>
                        <Search
                            loading={false}
                            onResultSelect={onResultSelect}
                            onSearchChange={onSearchChange}
                            results={searchResult}
                            value={searchValue}
                            placeHolder={"Search Users"}
                        />
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Post Title</Table.HeaderCell>
                                <Table.HeaderCell>Post Creator</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {postList.map((post, index) =>
                            (<Table.Row key={post.id}>
                                <Table.Cell>
                                    <div onClick={(e) => redirectPost(post)} className={"pointer"}>
                                        {post.title}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div onClick={(e) => redirectUser(userMap[post.userId])} className={"pointer"}>
                                        {userMap[post.userId]?.name || "NA"}
                                    </div>
                                </Table.Cell>
                            </Table.Row>),
                            )}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid.Column>
        </Grid >
    );
}