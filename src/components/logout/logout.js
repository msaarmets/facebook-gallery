import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../helpers/helpers';
import Loader from '../loader/Loader';
import Cookies from 'js-cookie';

class FacebookLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }
    async componentDidMount() {
        const loginStatus = await isLoggedIn();
        if (loginStatus === true) {
            await window.FB.logout(function (response) {
                console.log(response);
            })
            Cookies.remove("userName");
            this.setState({ loaded: true });
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

export default withRouter(FacebookLogout);