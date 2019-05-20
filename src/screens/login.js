import React from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../config';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

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
            Cookies.set("userName", response.name, { expires: 7, path: '' });
        }

    }

    componentDidMount() {
        if (isLoggedIn() === true) {
            if (this.props.history) {
                this.props.history.goBack();
            }
            this.setState({ toAlbums: true })
        }
    }
    render() {
        if (this.state.toAlbums === true) {
            return <Redirect to='/albums/' />
        }
        return (
            <>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center" style={{ height: "300px" }}>
                        <FacebookLogin
                            appId={config.fbID}
                            autoLoad={true}
                            fields="name,email,picture"
                            scope="public_profile, user_photos"
                            callback={this.responseFacebook}
                            version="3.3"
                            redirectUri="/albums"
                        />
                    </div>
                </div>
            </>
        )
    }
}



export default withRouter(LoginPage);