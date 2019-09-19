import '../style/App.css';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Documents from './Documents';
import ErrorToast from './ErrorToast';
import Navbar from './Navbar';
import Blogs from './Blogs';
import VideoLibrary from './Videos';
import Document from './Document';
import Video from './Video';

const home: React.FunctionComponent<{}> = () => {
    return (<>
        <Navbar />
        <Route path="/documents" component={Documents} exact={true} />
        <Route path={'/document/:id'} component={Document} />
        <Route path="/videos" component={VideoLibrary} exact={true} />
        <Route path="/blogs" component={Blogs} exact={true} />
        <Route path="/blog/:id" component={Document} />
        <Route path={'/video/:id'} component={Video} />
        <Route path="/" render={() => <Redirect to="/documents" />} />
    </>);
}

class App extends React.Component {
    render = () => {
        return (
            <div id="App">
                <ErrorToast />
                <Router>
                    <Switch>
                        <Route path={`/signin`} component={SignIn} />
                        <Route path={`/signup`} component={SignUp} />
                        <Route path="/" component={home} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
