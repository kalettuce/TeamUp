import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../utils/AuthContext";
import { useHistory } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { createUser } from '../../utils/CreateUser.js'
import { Card } from '@material-ui/core';
import ImageUploaderElement from '../containers/ImageUploaderElement';
import RegionSelect from '../containers/RegionSelect';
import TagsInputField from "../containers/TagsInputField";

export default function Signup() {
    const classes = useStyles();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const { signup } = useAuth();
    const history = useHistory();

    const [tags, setTags] = useState([]);
    const [region, setRegion] = useState('');
    const [picture, setPicture] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();


        const email = emailRef.current.value.trim();
        const name = nameRef.current.value.trim();
        const description = descriptionRef.current.value.trim();


        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.");
        } else if (description.length === 0) {
            return setError("Bio is required.");
        } else if (email.length === 0) {
            return setError("Email is required.");
        } else if (name.length === 0) {
            return setError("Name is required.");
        } else if (region.length === 0) {
            return setError("Region is required.");
        }

        try {
            setError("");
            setLoading(true);
            const ret = await signup(
                email, passwordRef.current.value);
            const userUID = ret.user.uid;
            createUser(userUID, description, 
                       email, name,
                       tags, region, picture);
            history.goBack();
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    return (
        <div className={classes.root}>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div
                    className="w-100"
                    style={{ maxWidth: "700px" }}>
                    <Card variant={"outlined"} className={classes.card}>
                            <h2 className="text-center mb-4">SIGN UP</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSignup}>
                                <Form.Group id="name">
                                    <Form.Label>
                                        Name
                                    </Form.Label>
                                    <Form.Control type="name" ref={nameRef} />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>
                                        Email
                                    </Form.Label>
                                    <Form.Control type="email" ref={emailRef} />
                                </Form.Group>
                                <Form.Group id="description">
                                    <Form.Label>
                                        Bio
                                    </Form.Label>
                                    <Form.Control type="description" ref={descriptionRef} />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>
                                        Password
                                    </Form.Label>
                                    <Form.Control type="password" ref={passwordRef} />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>
                                        Password Confirmation
                                    </Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} />
                                </Form.Group>
                                <br/>
                                <RegionSelect
                                    onChange={(e, region) => setRegion([region.label, region.code])}/>
                                <br />
                                <TagsInputField 
                                    tags={tags}
                                    placeholder={"Add interest tags by pressing enter"}
                                    setTags={setTags}/>
                                <ImageUploaderElement onDrop={(e) => {
                                    setPicture(e[0]);
                                }}/>
                                <Button
                                    disabled={loading}
                                    className={classes.button}
                                    type="submit"
                                    variant="outlined">
                                    SIGN UP
                                </Button>
                            </Form>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '10px',
        marginBottom: '5px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingRight: '25px',
        paddingLeft: '25px',
        marginRight: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
        width:"100%"
    },
    card: {
        padding: '20px',
    },
    root: {
        paddingTop: '50px',
    }
}));

