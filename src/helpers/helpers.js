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



