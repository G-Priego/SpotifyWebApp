import React from "react";
import styled from "styled-components";
import Album from "./Album";
import { useState } from "react";

const AlbumsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
`;

const ArtistAlbums = (props) =>{
    const artistAlbums = props.artistAlbums;
    const searchAlbum = props.searchAlbum;
    const artistName = props.artistName;

    const [mensaje, setMensaje] = useState("");
    return(
        <>
        <h2>{artistName}</h2>
        <AlbumsDiv>
            {artistAlbums.map((album, index) =>{
            return(
                <Album
                title={album.name}
                image={album.images[1].url}
                searchAlbum={searchAlbum}
                albumID={album.id}
                setMensaje={setMensaje}
                key={index}
                />
            )
            })}
        </AlbumsDiv>
        <h3>{mensaje}</h3>
        </>
        
    )
}

export default ArtistAlbums;