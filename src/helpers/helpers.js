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
    return response.status === "connected";

}

