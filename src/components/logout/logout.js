import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../helpers/helpers';
import Loader from '../loader/Loader';
import Cookies from 'js-cookie';
import { withTranslation } from 'react-i18next';

class FacebookLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
        this.t = this.props.t;
    }
    async componentDidMount() {
        try {
            const loginStatus = await isLoggedIn();
            if (loginStatus === true) {
                await window.FB.logout(function (response) {
                    console.log(response);
                })
                Cookies.remove("userName");
                this.setState({ loaded: true });
            }
        } catch (e) {
            this.props.addError(this.t('fb_api_error'))
        }
    }
    render() {
        if (this.state.loaded === true) {
            return <Redirect to="/login/" />
        }
        return (
            <Loader />
        )
    }
}

export default withRouter(withTranslation()(FacebookLogout));