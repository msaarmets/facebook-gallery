import React from 'react';
import Cookies from 'js-cookie';

async function getFBLoginStatus() {
    return new Promise((resolve) => {
        window.FB.getLoginStatus(function (response) {
            resolve(response);
        })

    })
}

export async function isLoggedIn() {
    const response = await getFBLoginStatus();
    if (response.status === "connected") {
        console.log("isLoggedIn(): ", response.status === "connected")
        Cookies.set("accessToken", response.authResponse.accessToken, { expires: 7, path: '' });
        return true;
    }
    console.log("isLoggedIn(): ", false)
    return false;
}



