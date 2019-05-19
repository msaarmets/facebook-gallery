import React from 'react';

async function getFBLoginStatus() {
    let result;
    window.FB.getLoginStatus(function (response) {
        result = response;
    });
    console.log(result)
    return result;
}

export async function isLoggedIn() {
    const response = await getFBLoginStatus();
    if (response) {
        console.log("isLoggedIn(): ", response.status === "connected")
        return response.status === "connected";
    }
    console.log("isLoggedIn(): ", false)
    return false;


}

export function facebookLogout() {
    window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            window.FB.logout(function (response) {
                console.log(response);
                return true;
            });
        }
    });
}



