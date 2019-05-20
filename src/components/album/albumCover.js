import React from 'react';
import { Link } from 'react-router-dom';
import './albumCover.css';

const AlbumCover = (props) => {
    return (
        <div key={props.album.id} className="col">
            <Link to={`/album/${props.album.id}`}>
                <div
                    className="card mx-1 my-3">
                    <div className="card-img" style={{ backgroundImage: `url(${props.album.picture.data.url})` }}>
                    </div>
                    <div className="card-title">{props.album.name}</div>
                </div>
            </Link>
        </div >
    )
}

export default AlbumCover;