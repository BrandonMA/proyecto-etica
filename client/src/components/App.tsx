import '../style/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import ErrorToast from './ErrorToast';
import Auth from './Auth';
import Navbar from './Navbar';
import Blog from './Blog';
import VideoLibrary from './VideoLibrary';
import Document from './Document';
import Video from './Video';

class App extends React.Component {
    render = () => {
        return (
            <div id="App">
                <ErrorToast />
                <Router>
                    <Route path={`/signin`} component={SignIn} />
                    <Route path={`/signup`} component={SignUp} />
                    <Auth>
                        <Navbar />
                        <Route path="/home" component={Home} exact={true} />
                        <Route path={'/documento/:id'} component={Document} />
                        <Route path="/video-library" component={VideoLibrary} exact={true} />
                        <Route path="/blog" component={Blog} exact={true} />
                        <Route path={'/video/:id'} component={Video} />
                        <Route exact path="/" render={() => <Redirect to="/home" />} />
                    </Auth>
                </Router>
            </div>
        );
    }
}

export default App;
