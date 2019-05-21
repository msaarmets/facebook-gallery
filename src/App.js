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
import { history } from './helpers/history';
import ErrorsBlock from './components/errors/errors';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      errors: []
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

  Login = () => {
    history.push("/login/");
    return <LoginPage addError={this.addError} />
  }
  Albums = () => {
    history.push("/albums/");
    return <AlbumsPage addError={this.addError} />
  }
  Album = ({ match }) => {
    history.push(`/album/${match.params.id}`);
    return <AlbumPage albumID={match.params.id} addError={this.addError} />
  }
  Logout = () => {
    history.push("/logout/");
    return <FacebookLogout addError={this.addError} />
  }

  addError = err => {
    this.setState({ errors: [...this.state.errors, err] });
  }

  cleanErrors = () => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: [] });

    }
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
          {this.state.errors.length > 0 &&
            <ErrorsBlock errors={this.state.errors} cleanErrors={this.cleanErrors}/>
          }
          <div className="row">
            <div className="col-12">
              <Switch>
                <Route path="/" exact component={this.Albums} />
                <Route path="/login/" component={this.Login} />
                <Route path="/albums/" exact component={this.Albums} />
                <Route path="/album/:id" component={this.Album} />
                <Route path="/logout/" component={this.Logout} />
              </Switch>
            </div>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
