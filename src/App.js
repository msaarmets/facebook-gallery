import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginPage from './screens/login';
import AlbumsPage from './screens/albums';
import AlbumPage from './screens/album';
import FacebookLogout from './components/logout/logout';
import Loader from './components/loader/Loader';
import './App.css';
import config from './config.json';
import './i18n/i18n';

function Login() {
  return <LoginPage />
}
function Albums() {
  return <AlbumsPage />
}
function Album({ match }) {
  return <AlbumPage albumID={match.params.id} />
}
function Logout() {
  return <FacebookLogout />
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
        <div className="container">
          <div className="row d-none">
            <div className="col-12">
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
                    <Link to="/logout/">Log out</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Switch>
                <Route path="/" exact component={Albums} />
                <Route path="/login/" component={Login} />
                <Route path="/albums/" exact component={Albums} />
                <Route path="/album/:id" component={Album} />
                <Route path="/logout/" component={Logout} />
              </Switch>
            </div>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
