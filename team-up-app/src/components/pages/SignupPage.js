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

export default function Signup() {
    const classes = useStyles();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const [region, setRegion] = useState('');
    const [picture, setPicture] = useState([]);
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSignup(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        } else if (descriptionRef.current.value.length === 0) {
            return setError("Bio is required");
        } else if (emailRef.current.value.length === 0) {
            return setError("Email is required");
        } else if (nameRef.current.value.length === 0) {
            return setError("Name is required");
        } else if (region.length === 0) {
            return setError("Time zone is required");
        }

        try {
            setError("");
            setLoading(true);
            
            const ret = await signup(emailRef.current.value, passwordRef.current.value);
            const userUID = ret.user.uid;

            createUser(userUID, descriptionRef.current.value, emailRef.current.value, nameRef.current.value, region, picture);

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
            style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card className={classes.card}>
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
                                <RegionSelect onChange={(e, region) => setRegion([region.label, region.code])}/>
                                <ImageUploaderElement onDrop={(e) => {
                                    setPicture(e[0]);
                                }}/>
                                <Button disabled={loading} className={classes.button} type="submit" variant="outlined">
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

