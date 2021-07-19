import React from 'react';
import './UpComingMovies.css';

const UpComingMovies = function (props) {
    return (
        <div className="subheader">
            {props.heading}
        </div>
    );
}

export default UpComingMovies;