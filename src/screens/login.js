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
        console.log("responseFacebook:", response);

        if (await isLoggedIn() === true) {
            this.setState({ toAlbums: true })
            Cookies.set("userID", response.userID, { expires: 7, path: '' });
            Cookies.set("userName", response.name, { expires: 7, path: '' });
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
        if (isLoggedIn() === true) {
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
                    scope="public_profile, user_photos"
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