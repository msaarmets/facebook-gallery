import React from 'react';
import { isLoggedIn } from '../helpers/helpers';
import { Redirect } from 'react-router-dom';
import UserInfoBlock from '../components/userInfo/userInfo';
import Cookies from 'js-cookie';
import Loader from '../components/loader/Loader';
import AlbumCover from '../components/album/albumCover';

class AlbumsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            loaded: false,
            albums: {},
            cover_photos: {}
        }
    }

    async componentDidMount() {
        if (await isLoggedIn() === true) {
            let albums = await this.getAlbums(Cookies.get("userID"));
            this.getAlbumCovers(albums.data);
            this.setState({ logged: true, loaded: true, albums: albums.data });
        }
        else {
            this.setState({ loaded: true, logged: false });
        }

    }

    getAlbums = async (userID) => {
        return new Promise(async (resolve) => {
            /* make the API call */
            await window.FB.api(
                `/${userID}/albums`,
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        resolve(response);
                    }
                }
            )
        });
    }
    getAlbum = async (albumID) => {
        return new Promise((resolve) => {
            /* make the API call */
            window.FB.api(
                `/${albumID}/picture`,
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

    getAlbumCovers = async (albums) => {

        for (let i = 0; i < Object.keys(albums).length; i++) {
            const albumID = albums[i].id;
            const albumData = await this.getAlbum(albumID);
            this.setState({ cover_photos: { ...this.state.cover_photos, [albumID]: albumData.data.url } });
        }
    }

    render() {
        if (this.state.loaded === false) {
            return <Loader />
        }
        else if (this.state.logged === false) {
            return <Redirect to="/login/" />
        }
        else if (Object.keys(this.state.cover_photos).length > 0) {
            return (
                <>
                    <UserInfoBlock />
                    {Object.keys(this.state.albums).map(el => {
                        const id = this.state.albums[el].id;
                        return <AlbumCover album={this.state.albums[el]} cover={this.state.cover_photos[id]} key={`${el.id}${el}`} />
                    })}
                </>
            )
        }
        return (
            <>
                <UserInfoBlock />
                <div className="alert alert-warning" role="alert">
                    A simple warning alert—check it out!
</div>
            </>
        )
    }
}





export default AlbumsPage;