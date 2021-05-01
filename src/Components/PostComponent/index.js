import React, { useState, useEffect, useContext } from "react";
import { Grid, Form, Header, Message, Container, Table, Button, Breadcrumb } from 'semantic-ui-react';
import ApplicationContext from "../../Contexts";
import { useHistory } from 'react-router-dom';

export default function PostComponent() {
    const history = useHistory();

    const {
        currentPost,
        userMap,
        fetchPostComments
    } = useContext(ApplicationContext);

    const [commentList, setCommentList] = useState([]);
    const updateCommentList = async () => {
        const comments = await fetchPostComments(currentPost.id);
        setCommentList(comments);
    }
    useEffect(updateCommentList, [])

    const currentUser = userMap[currentPost.userId];

    const redirectHome = (e) => {
        history.push("/");
    }
    return (
        <Grid className={"table-default"}>
            <Grid.Row width={16}>
                <Grid.Column width={3}>
                    <Breadcrumb size={"big"}>
                        <Breadcrumb.Section link onClick={redirectHome}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider />
                        <Breadcrumb.Section active>Post</Breadcrumb.Section>
                    </Breadcrumb>
                </Grid.Column>
                <Grid.Column width={9}>
                    <Container text textAlign='justified'>
                        <Header as='h3'>{currentPost.title}</Header>
                        <p>
                            {currentPost.body}
                        </p>
                    </Container>
                </Grid.Column>
                <Grid.Column width={4} textAlign='justified'>
                    <Container text>
                        <Header as='h3'>{currentUser.username}</Header>
                        <p>
                            {currentUser.name}
                        </p>
                    </Container>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row width={16}>
                <Table celled >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Comment Subject</Table.HeaderCell>
                            <Table.HeaderCell>Comment Body</Table.HeaderCell>
                            <Table.HeaderCell>Commenter Email</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {commentList.map((comment, index) =>
                        (<Table.Row key={comment.id}>
                            <Table.Cell>{comment.name}</Table.Cell>
                            <Table.Cell>{comment.body}</Table.Cell>
                            <Table.Cell>{comment.email}</Table.Cell>
                        </Table.Row>),
                        )}
                    </Table.Body>
                </Table>
            </Grid.Row>
        </Grid >)
}