import React from 'react';
import { facebookLogout } from '../../helpers/helpers';
import { withRouter, Link } from 'react-router-dom';
import './userInfo.css';
import Cookies from 'js-cookie';
import FacebookLogout from '../logout/logout';

const UserInfoBlock = () => {
    return (
        <p>{`Hello, ${Cookies.get("userName")}!`} <Link to="/logout/">Logout</Link></p>
    )
}

export default withRouter(UserInfoBlock);