import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCover = (props) => {
    return (
        <div key={props.album.id}>
            <Link to={`/album/${props.album.id}`}><img src={props.album.picture.data.url} alt={props.album.name}></img></Link>
            <p>{props.album.name}</p>
        </div>
    )
}

export default AlbumCover;