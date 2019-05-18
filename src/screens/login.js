import React from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../config';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router'

import { isLoggedIn } from '../helpers/helpers';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toAlbums: false };

        this.responseFacebook = this.responseFacebook.bind(this);
    }
    async responseFacebook(response) {
        console.log(response);
        Cookies.set("userID", response.userID);

        if (isLoggedIn()) {
            this.setState({ toAlbums: true })
        }

    }

    /* make the API call */
    getAlbums = (userID) => window.FB.api(
        `/${userID}/albums`,
        function (response) {
            if (response && !response.error) {
                /* handle the result */
                console.log(response)
            }
        }
    );

    componentDidMount() {
        if (isLoggedIn()) {
            this.setState({ toAlbums: true })
        }
    }
    render() {
        if (this.state.toAlbums === true) {
            return <Redirect to='/albums/' />
        }
        return (
            <>
                <FacebookLogin
                    appId={config.fbID}
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="user_photos"
                    callback={this.responseFacebook}
                    version="3.3"
                    redirectUri="/albums"
                />
                <button onClick={() => this.getAlbums(Cookies.get("userID"))}>Get albums</button>
            </>
        )
    }
}



export default LoginPage;