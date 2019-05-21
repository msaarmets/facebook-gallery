import React from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../config';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router';
import { history } from '../helpers/history';
import { isLoggedIn } from '../helpers/helpers';
import { withTranslation } from 'react-i18next';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toAlbums: false,
            redirect: ""
        };

        this.responseFacebook = this.responseFacebook.bind(this);
        this.t = this.props.t;
    }
    async responseFacebook(response) {
        try {
            if (await isLoggedIn() === true) {
                Cookies.set("userName", response.name, { expires: 7, path: '' });
                // Check if user was visiting page anonymously and redirect back after login
                if (history.length > 1 && history[history.length - 2] !== "/logout/") {
                    this.setState({ redirect: history[history.length - 2] })
                }
                else {
                    this.setState({ toAlbums: true })
                }
            }
        } catch (e) {
            this.props.addError(this.t('fb_api_error'))
        }

    }

    componentDidMount() {
        try {
            if (isLoggedIn() === true) {
                this.setState({ toAlbums: true })
            }
        } catch (e) {
            this.props.addError(this.t('fb_api_error'))
        }
    }
    render() {
        if (this.state.toAlbums === true) {
            return <Redirect to='/albums/' />
        }
        else if (this.state.redirect !== "") {
            return <Redirect to={this.state.redirect} />
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



export default withTranslation()(LoginPage);