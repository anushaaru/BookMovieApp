import React, { Component } from 'react';
import './Header.css';
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn
        }
    }

    render() {
        return (
            <div className="header">
                <img src={logo} className="rotate" alt="My logo" />

                <div className="loginBtn">
                    <Link to="/bookshow"> <Button variant="contained" color="primary">Book Show</Button></Link>
                    <Link to="/login">
                        <Button variant="contained" >
                            {this.state.loggedIn ? 'LogOut' : 'Login'}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}


export default Header;