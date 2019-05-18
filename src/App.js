import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import LoginPage from './screens/login';
import config from './config.json';
import './App.css';

function Login() {
  return <LoginPage />
}
function Albums() {
  return <h1>Albums</h1>
}

class App extends React.Component {


  componentDidMount() {
    // If FB is not yet initialized, load it
    if (typeof window.FB == "undefined") {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: `${config.fbID}`,
          cookie: true,  // enable cookies to allow the server to access
          // the session
          xfbml: true,  // parse social plugins on this page
          version: 'v3.3' // use version 2.1
        });
      };

      // Load the SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }

  }

  render() {
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
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login/" component={Login} />
            <Route path="/albums/" component={Albums} />
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;
