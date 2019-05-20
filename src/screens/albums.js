import React from 'react';
import { isLoggedIn, getAlbums } from '../helpers/helpers';
import { Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import UserInfoBlock from '../components/userInfo/userInfo';
import Loader from '../components/loader/Loader';
import AlbumCover from '../components/album/albumCover';

class AlbumsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            loaded: false,
            albums: {}
        }
    }

    async componentDidMount() {
        if (await isLoggedIn() === true) {
            let albums = await getAlbums();
            this.setState({ logged: true, loaded: true, albums: albums.data });
        }
        else {
            this.setState({ loaded: true, logged: false });
        }

    }

    render() {
        if (this.state.loaded === false) {
            return <Loader />
        }
        else if (this.state.logged === false) {
            return <Redirect to="/login/" />
        }
        else if (Object.keys(this.state.albums).length === 0) {
            return (
                <>
                    <UserInfoBlock />
                    <div className="alert alert-warning" role="alert">
                        No albums found!
                    </div>
                </>
            )
        }

        return (
            <>
                <UserInfoBlock />
                <div className="row">
                    <div className="col-12">
                        <div className="display-3">{this.props.t('your_albums')}</div>
                    </div>
                </div>
                <div className="row my-5">
                    {Object.keys(this.state.albums).map(el => {
                        return <AlbumCover album={this.state.albums[el]} key={`${el.id}${el}`} />
                    })}
                </div>
            </>
        )
    }
}

export default withTranslation()(AlbumsPage);