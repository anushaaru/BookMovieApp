
import React from 'react';
import Typography from "@material-ui/core/Typography";
import './Details.css';
import Header from '../../common/header/Header';
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import ImageList from '@material-ui/core/ImageList';

var getYouTubeID = require('get-youtube-id');

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.data,
            title: "",
            poster_url: "",
            trailer_url: "",
            genres: "",
            duration: "",
            release_date: "",
            rating: "",
            loggedIn: this.props.location.data,
            opts: {
                height: '390',
                width: '640',
                playerVars: {
                    autoplay: 1
                }
            }
        }


    }
    async componentDidMount() {

        const rawResponse = await fetch("http://localhost:8085/api/v1/movies/" + this.state.id);
        const data = await rawResponse.json();
        this.setState({
            rating: data.rating,
            title: data.title,
            poster_url: data.poster_url,
            trailer_url: data.trailer_url,
            genres: data.genres,
            release_date: data.release_date,
            story_line: data.storyline,
            wiki_url: data.wiki_url,
            artists: data.artists,
            artistsList: [],
            duration: data.duration

        });

    }

    render() {

        const id = getYouTubeID(this.state.trailer_url);

        return (

            <div className="details">
                <Header loggedIn={this.state.loggedIn} />
                <div className='container'>
                    <div className="firstColumn">
                        <Link to="/home"><Typography className="back">
                            &#60; Back to Movie Details
                    </Typography></Link>
                        <img src={this.state.poster_url} alt="imagenotavailable"></img>
                    </div>

                    <div className="secondColumn">
                        <Typography variant="headline" component="h2">
                            {this.state.title}
                        </Typography>
                        <Typography variant="headline"> <b>Genres:</b> {this.state.genres}</Typography> <br />
                        <Typography variant="headline"> <b>Duration:</b> {this.state.duration}</Typography> <br />
                        <Typography variant="headline"> <b>Release Date:</b> {this.state.release_date}</Typography> <br />
                        <Typography variant="headline"> <b>Rating:</b> {this.state.rating}</Typography> <br />
                        <Typography variant="headline"> <b>Plot:</b> <a href={this.state.wiki_url}>(Wiki_Link)</a> {this.state.story_line}</Typography> <br />
                        <Typography variant="headline"> <b>Trailor: </b></Typography> <br />

                        <div className="video-responsive">
                            <YouTube videoId={id} opts={this.state.opts} onReady={this._onReady} />
                        </div>
                    </div>

                    <div className="thirdColumn" >
                        <Typography variant="headline" component="h2">
                            Rate this movie:
                        </Typography><br />

                        <Typography variant="headline" component="h2">
                            Artists:
                        </Typography><br />

                    </div>
                </div>
            </div>
        );
    }
}

export default Details;