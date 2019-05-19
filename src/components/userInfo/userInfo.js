import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './userInfo.css';
import Cookies from 'js-cookie';

const UserInfoBlock = (props) => {
    const t = props.t;
    const changeLanguage = lang => { props.i18n.changeLanguage(lang) };
    return (
        <div className="d-flex justify-content-between mx-5">
            <div>{`${t('hello')}, ${Cookies.get("userName")}!`} <Link to="/logout/">{t('logout')}</Link></div>
            <div>
                <span id="language-selector"><a href="javascript:void(0)" onClick={() => changeLanguage('en')}>EN</a>/<a href="javascript:void(0)" onClick={() => changeLanguage('et')}>ET</a></span>
            </div >
        </div>
    )
}

export default withTranslation()(UserInfoBlock);