import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './userInfo.css';
import Cookies from 'js-cookie';

const UserInfoBlock = (props) => {
    const t = props.t;
    const changeLanguage = lang => { props.i18n.changeLanguage(lang) };
    return (
        <div className="row">
            <div className="col-12">
                <div id="header" className="d-flex justify-content-between align-items-center px-5">
                    <div>{`${t('hello')}, `}<span className="font-weight-bold">{Cookies.get("userName")}</span>! <Link to="/logout/">{t('logout')}</Link></div>
                    <div>
                        <span id="language-selector"><div className="pointer d-inline-block" onClick={() => changeLanguage('en')}>EN</div> | <div className="pointer d-inline-block" onClick={() => changeLanguage('et')}>ET</div></span>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(UserInfoBlock);