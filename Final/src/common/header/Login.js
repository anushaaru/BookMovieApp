import React, { useState, useEffect } from 'react';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import './Common.css';
import { Link } from "react-router-dom";


const Login = function () {
    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [reqUserName, setReqUserName] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");

    useEffect(() => {
        if (localStorage.getItem('getItem')) {
            console.log("suc");
        }
    })

    async function loginButtonHandler() {
        userName === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");


        if (
            userName === "" ||
            password === ""

        ) {

            return;
        }


        const params = window.btoa(`${userName}:${password}`);


        const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                authorization: `Basic ${params}`

            }
        });
        const result = await rawResponse.json();

        if (rawResponse.ok) {
            window.sessionStorage.setItem('user-details', JSON.stringify(result));
            window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));

        }

    }

    return (
        <div className="register">

            <Card className="cardStyle">
                <CardContent>
                    <Typography variant="headline" component="h2">
                        LOGIN
                    </Typography>
                    <br />
                    <FormControl required className="formControl">
                        <InputLabel htmlFor="username">User Name</InputLabel>
                        <Input id="username" type="text" value={userName !== 0 ? userName : ""} onChange={(e) => setUserName(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqUserName}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br />


                    <FormControl required className="formControl">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" value={password !== 0 ? password : ""} onChange={(e) => setPassword(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqPassword}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br /><br />



                    <Link to={{ pathname: "/home", data: 'loggedIn' }}><Button
                        variant="contained"
                        color="primary"
                        onClick={loginButtonHandler}
                    >
                        Login
                    </Button></Link>
                </CardContent>
            </Card>
        </div>

    );
}

export default Login;