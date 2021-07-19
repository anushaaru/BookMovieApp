import React, { Fragment } from 'react';
import Home from './home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './details/Details'
import SignInOut from '../common/header/SignInOut'
import BookShow from './bookshow/BookShow';


export default function Controller(){
    return (<Fragment>

        <Router>
            <div>
                <Route exact path="/" render={(props) => <Home {...props}  />} />
                <Route exact path="/home" render={(props) => <Home {...props}  />} />
                <Route exact path="/details" render={(props) => <Details {...props} />} />
                <Route exact path="/login" render={(props) => <SignInOut {...props}  />} />
                <Route exact path="/bookshow" render={(props) => <BookShow {...props} />} />
               
            </div>
        </Router>
            
        </Fragment>
    );

}
