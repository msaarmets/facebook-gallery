/* import React from 'react'; */
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
        Cookies.set("accessToken", response.authResponse.accessToken, { expires: 7, path: '' });
        return true;
    }
    return false;
}

// Details of the album
export async function getAlbum(albumID) {
    return new Promise((resolve) => {
        /* make the API call */
        window.FB.api(
            `/${albumID}/?fields=name, picture`,
            {
                "type": "album",
                "redirect": "false"
            },
            function (response) {
                if (response && !response.error) {
                    /* handle the result */
                    resolve(response);
                }
            }
        )
    });
}

// List of albums
export async function getAlbums() {
    return new Promise(async (resolve) => {
        /* make the API call */
        await window.FB.api(
            `/me/albums?fields=picture,name`,
            function (response) {
                if (response && !response.error) {
                    resolve(response);
                }
            }
        )
    });
}

// Photos of the album
export async function getPhotos(albumID) {
    return new Promise(async (resolve) => {
        await window.FB.api(
            `/${albumID}/photos?fields=source, picture, width, height`,
            function (response) {
                if (response && !response.error) {
                    resolve(response);
                }
            }
        )
    });
}



