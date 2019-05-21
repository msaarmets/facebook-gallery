import React from 'react';
import { isLoggedIn, getPhotos, getAlbum } from '../helpers/helpers';
import { Redirect, Link } from 'react-router-dom';
import UserInfoBlock from '../components/userInfo/userInfo';
import Loader from '../components/loader/Loader';
import Gallery from 'react-grid-gallery';
import './albums.css';
import { withTranslation } from 'react-i18next';

class AlbumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            loaded: false,
            photos: [],
            album: {}
        }
        this.t = this.props.t;
    }

    async componentDidMount() {

        try {
            if (await isLoggedIn() === true) {
                let album = {};
                const photos = await getPhotos(this.props.albumID);
                try {
                    album = await getAlbum(this.props.albumID);
                } catch (e) {
                    (() => { this.props.addError(this.t("Error_getting_album")) })();
                }

                const photoArray = this.photosToArray(photos);
                this.setState({ logged: true, loaded: true, photos: photoArray, album: album });
            }
            else {
                this.props.addError(this.t("please_login"));
                this.setState({ loaded: true, logged: false });
            }
        } catch (e) {
            if (e === "Invalid URL") {
                this.props.addError(this.t('invalid_url'))
            }
            else {
                this.props.addError(this.t('fb_api_error'))
            }

            this.setState({ loaded: true, logged: false });

        }
    }

    // Generate array of photos for Gallery component
    photosToArray = (photos) => {
        let result = [];

        for (var i = 0; i < photos.data.length; i++) {
            const photoData = photos.data[i];
            let obj = {};
            obj.src = photoData.source;
            obj.thumbnail = photoData.source;
            obj.thumbnailWidth = 320;
            obj.thumbnailHeight = 320 / photoData.width * photoData.height;

            result.push(obj);
        }
        return result;
    }
    render() {
        if (this.state.loaded === false) {
            return <Loader />
        }
        else if (this.state.logged === false) {
            return <Redirect to="/login/" />
        }
        else if (this.state.photos.length > 0) {
            return (
                <>
                    <UserInfoBlock />
                    <div className="row">
                        <div className="col-12">
                            <div className="display-3 my-5">{this.state.album.name}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div style={{
                                display: "block",
                                minHeight: "1px",
                                width: "100%",
                                border: "1px solid #ddd",
                                overflow: "auto",
                                textAlign: "center",
                                background: "white"
                            }}>
                                <Gallery
                                    images={this.state.photos}
                                    enableImageSelection={false}
                                    backdropClosesModal={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12" id="back-btn">
                            <Link to="/albums/"><span id="back" style={{ fontSize: "40px" }}>&#8617;</span></Link>
                        </div>
                    </div>
                </>
            )
        }
        return (
            <>
                <UserInfoBlock />
                <div className="alert alert-warning" role="alert">
                    No photos found!
                </div>
            </>
        )
    }
}





export default withTranslation()(AlbumPage);