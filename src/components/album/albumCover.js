import React from 'react';

const AlbumCover = (props) => {
    return (
        <div key={props.album.id}>
            <img src={props.cover} alt={props.album.name}></img>
            <p>{props.album.name}</p>
        </div>
    )
}

export default AlbumCover;