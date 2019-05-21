/* import React from 'react'; */
import Cookies from 'js-cookie';

async function getFBLoginStatus() {
    return new Promise((resolve, reject) => {
        window.FB.getLoginStatus(function (response) {
            if (response && !response.error) {
                resolve(response);
            }
            else {
                reject("Error connecting Facebook API")
            }

        })
    })
}

export async function isLoggedIn() {
    try {
        const response = await getFBLoginStatus();
        if (response.status === "connected") {
            Cookies.set("accessToken", response.authResponse.accessToken, { expires: 7, path: '' });
            return true;
        }
        return false;
    } catch (e) {
        throw new Error("Error connectiong Facebook API")
    }
}

// Details of the album
export async function getAlbum(albumID) {
    return new Promise((resolve, reject) => {
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
                else {
                    reject("Error getting the album");
                }
            }
        )
    });
}

// List of albums
export async function getAlbums() {
    return new Promise(async (resolve, reject) => {
        /* make the API call */
        await window.FB.api(
            `/me/albums?fields=picture,name`,
            function (response) {
                if (response && !response.error) {
                    resolve(response);
                }
                else {
                    reject("Error getting albums list")
                }
            }
        )
    });
}

// Photos of the album
export async function getPhotos(albumID) {
    return new Promise(async (resolve, reject) => {
        await window.FB.api(
            `/${albumID}/photos?fields=source, picture, width, height`,
            function (response) {
                if (response && !response.error) {
                    resolve(response);
                }
                else {
                    reject("Error getting photos")
                }
            }
        )
    });
}