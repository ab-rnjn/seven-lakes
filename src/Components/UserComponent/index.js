import React, { useState, useEffect, useContext } from "react";
import { Grid, Item, Breadcrumb } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ApplicationContext from "../../Contexts";

export default function UserComponent() {
    const history = useHistory();

    const {
        currentUser,
    } = useContext(ApplicationContext);

    const redirectHome = (e) => {
        history.push("/");
    }
    
    return (
        <Grid className={"table-default"}>
            <Grid.Column width={4}>
                <Breadcrumb size={"big"}>
                    <Breadcrumb.Section link onClick={redirectHome}>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>User</Breadcrumb.Section>
                </Breadcrumb>
            </Grid.Column>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Username</Item.Header>
                            <Item.Meta>{currentUser.username}</Item.Meta>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Full Name</Item.Header>
                            <Item.Meta>{currentUser.name}</Item.Meta>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Email</Item.Header>
                            <Item.Meta>{currentUser.email}</Item.Meta>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Website</Item.Header>
                            <Item.Meta>{currentUser.website}</Item.Meta>
                        </Item.Content>
                    </Item>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Company Details</Item.Header>
                            <Item.Meta>{currentUser.company?.name}</Item.Meta>
                            <Item.Extra>{currentUser.company?.catchPhrase}</Item.Extra>
                            <Item.Extra>{currentUser.company?.bs}</Item.Extra>
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Grid.Column>
        </Grid >
    )

}

