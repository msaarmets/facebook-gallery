import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { facebookLogout } from './helpers/helpers';
import LoginPage from './screens/login';
import AlbumsPage from './screens/albums';
import Loader from './components/loader/Loader';
import './App.css';
import config from './config.json';

function Login() {
  return <LoginPage />
}
function Albums() {
  return <AlbumsPage />
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }


  async componentWillMount() {
    const self = this;
    // Load and initialize Facebook SDK
    window.fbAsyncInit = await function () {
      window.FB.init({
        appId: `${config.fbID}`,
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v3.3'
      });

      // After FB is loaded load the app
      self.setState({ loaded: true })
    };
    // Load the SDK asynchronously
    (await function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }


  render() {
    if (!this.state.loaded) {
      return <Loader />
    }
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login/">Login</Link>
              </li>
              <li>
                <Link to="/albums/">Albums</Link>
              </li>
              <li>
                <button onClick={() => facebookLogout()}>Log out</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Loader} />
            <Route path="/login/" component={Login} />
            <Route path="/albums/" component={Albums} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
