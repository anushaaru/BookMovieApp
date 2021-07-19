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

const Register = function () {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [reqFirstName, setReqFirstName] = useState("dispNone");
    const [reqLastName, setReqLastName] = useState("dispNone");
    const [reqEmail, setReqEmail] = useState("dispNone");
    const [reqPassword, setReqPassword] = useState("dispNone");
    const [reqContact, setReqContact] = useState("dispNone");
    const [message, setMessage] = useState("");

    useEffect(()=>{
        if(localStorage.getItem('getItem')){
            console.log("suc");
        }
    })

    function registerButtonHandler() {
        firstName === "" ? setReqFirstName("dispBlock") : setReqFirstName("dispNone");
        lastName === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
        email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
        password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
        contact === "" ? setReqContact("dispBlock") : setReqContact("dispNone");

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === "" ||
            contact === ""
        ) {
           
            return;
        }
        
        const params = {
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: contact,
            password: password
        }

         fetch('http://localhost:8085/api/v1/signup', {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            }).then((response) => response.json()).then((message) => { setMessage("Registration Successfull. Please Login!")});

    
            
    }

    return (
        <div className="register">

            <Card className="cardStyle">
                <CardContent>
                    <Typography variant="headline" component="h2">
                        REGISTER
                    </Typography>
                    <br />
                    <FormControl required className="formControl">
                        <InputLabel htmlFor="first-name">First Name</InputLabel>
                        <Input id="first-name" type="text" value={firstName !== 0 ? firstName : ""} onChange={(e)=>setFirstName(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqFirstName}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br />

                    <FormControl required className="formControl">
                        <InputLabel htmlFor="last-name">Last Name</InputLabel>
                        <Input id="last-name" type="text" value={lastName !== 0 ? lastName : ""} onChange={(e)=>setLastName(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqLastName}>
                            <span className="red">Required</span>
                        </FormHelperText>

                    </FormControl><br />

                    <FormControl required className="formControl">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" type="text" value={email !== 0 ? email : ""} onChange={(e)=>setEmail(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqEmail}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br />

                    <FormControl required className="formControl">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" value={password !== 0 ? password : ""} onChange={(e)=>setPassword(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqPassword}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br />

                    <FormControl required className="formControl">
                        <InputLabel htmlFor="contact">Contact No</InputLabel>
                        <Input id="contact" type="text" value={contact !== 0 ? contact : ""} onChange={(e)=>setContact(e.target.value)} aria-describedby="my-helper-text" />
                        <FormHelperText className={reqContact}>
                            <span className="red">Required</span>
                        </FormHelperText>
                    </FormControl><br /><br />

                    <span>{message}</span><br/>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={registerButtonHandler}
                    >
                        Register
                    </Button>
                </CardContent>
            </Card>
        </div>

    );
}

export default Register;