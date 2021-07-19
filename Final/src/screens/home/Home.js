import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import UpComingMovies from '../../common/header/UpComingMovies';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upcomingMoviesList: [],
            releasesMoviesList: [],
            artists: [],
            genres: [],
            selectedGenres: "",
            selectedMovieName: "",
            selectedArtist: "",
            loggedIn:this.props.location.data
        }
    }

    async componentDidMount() {
        const rawResponse = await fetch("http://localhost:8085/api/v1/movies");
        const data = await rawResponse.json();
        let upcomingMoviesList = [];
        let releasesMoviesList = [];
        for (var i = 0; i < 10; i++) {
            if (data.movies[i].status === "PUBLISHED") {
                upcomingMoviesList.push({
                    poster_url: data.movies[i].poster_url,
                    title: data.movies[i].title,
                    id:data.movies[i].id
                })

            }

            if (data.movies[i].status === "RELEASED") {
                releasesMoviesList.push({
                    poster_url: data.movies[i].poster_url,
                    title: data.movies[i].title,
                    releaseDate: data.movies[i].release_date,
                    id:data.movies[i].id
                })
            }
        }

        this.setState({ releasesMoviesList: releasesMoviesList });
        this.setState({ upcomingMoviesList: upcomingMoviesList });

        const rawInput = await fetch("http://localhost:8085/api/v1/artists");
        const rawData = await rawInput.json();

        this.setState({ artists: rawData.artists });

        const response = await fetch("http://localhost:8085/api//v1/genres");
        const input = await response.json();

        this.setState({ genres: input.genres });


    }


    movieNameHandler(e) {
        this.setState({ selectedMovieName: e.target.value })
    }

    genresChangeHandler(event) {
        var genre = event.currentTarget.children[1].textContent;
        this.setState({ selectedGenres: genre });

    }

    artistChangeHandler(e) {
        this.setState({ selectedArtist: e.target.value });
    }

    applyButtonHandler() {
        var filetrData=[];
        
        var releasedMovie = this.state.releasesMoviesList;
        for(var i=0;i<releasedMovie.length;i++) {
            if(this.state.selectedMovieName === releasedMovie[i].title) {
                filetrData.push(releasedMovie[i]);
            }
           
        }
        this.setState({releasesMoviesList:filetrData});
    }


    render() {
        const imageList = this.state.upcomingMoviesList.map((up) => {

            return (<ImageListItem key={up.poster_url}>
                <img src={up.poster_url} alt="notavailable"/>
                <ImageListItemBar className="titleBar"
                    title={up.title}

                />
            </ImageListItem>);
        });

        const releaseList = this.state.releasesMoviesList.map((up) => {
            return (<ImageListItem key={up.poster_url}>
                
                       <Link to={{pathname: "/details", data:up.id}}> <img src={up.poster_url} alt="notavailable" className="clickableimage" /> </Link>
                 
                <ImageListItemBar className="titleBar"
                    title={up.title}
                    date={up.releaseDate}

                />
            </ImageListItem>);
        });

        return (

            <div className="sub-root">
                <Header loggedIn={this.state.loggedIn}/>
                <UpComingMovies heading="upcoming movies" />
                <div className="gridroot">
                    <ImageList className="imagelist" cols={6} rowHeight={250} style={{ 'flexWrap': 'nowrap' }}>
                        {imageList}
                    </ImageList>
                </div>

                <div className="cardlist flex-container">
                    <div className="imageroot" >
                        <ImageList className="imagelist" cols={4} rowHeight={350}>
                            {releaseList}
                        </ImageList>
                    </div>
                    <div className="sublist">

                    
                        <div className="findMovies">
                            <Card className="card">
                                <CardContent>
                                    <Typography className="">
                                        FIND MOVIES BY
                                    </Typography>
                                    <br />
                                </CardContent>
                                <FormControl className="formControl">
                                    <InputLabel htmlFor="moviename">
                                        Movie Name
                                    </InputLabel>
                                    <Input
                                        id="moviename" type="text" onChange={(e) => this.movieNameHandler(e)} value={this.state.selectedMovieName}
                                    />
                                </FormControl><br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="genres" >Genres</InputLabel>
                                    {/* <Input id="genres" type="text" value={this.state.selectedGenres} /> */}
                                    <Select  onChange={(event) => this.genresChangeHandler(event)}>
                                        {this.state.genres.map((gen) => (
                                            <MenuItem key={"gen" + gen.id}>
                                                <Checkbox color="default" />
                                                <span>{gen.genre}</span>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br />

                                <FormControl className="formControl">
                                    <InputLabel htmlFor="artist">Artists</InputLabel>
                                    <Select  >
                                        {this.state.artists.map((art) => (

                                            <MenuItem key={"art" + art.id}>
                                                <Checkbox color="default" /> {art.first_name}  {art.last_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <br /><br />
                                <FormControl className="formControl">
                                    <TextField id="standard-basic" label="Release Date Start" type="date" InputLabelProps={{ shrink: true }} />
                                </FormControl>
                                <br /><br />
                                <FormControl className="formControl">
                                    <TextField id="standard-basic" label="Release Date End" type="date" InputLabelProps={{ shrink: true }} />
                                </FormControl><br /> <br />

                                <Button variant="contained" onClick={(e)=>this.applyButtonHandler(e)} color="primary">
                                    APPLY
                                </Button>

                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        );


    }
}

export default Home;
