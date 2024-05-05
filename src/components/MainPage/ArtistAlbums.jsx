import React from "react";
import styled from "styled-components";
import Album from "./Album";
import { useState } from "react";

const ArtistInfo = styled.div`
    display: flex;
    flex-direction: column;
`;
const AlbumsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
`;

const ArtistAlbums = (props) =>{
    const { artistAlbums, artistName, accessToken} = props;
    const [mensaje, setMensaje] = useState("");

    return(
        <ArtistInfo>
        <h2>{artistName}</h2>
        <h3>{mensaje}</h3>
        <AlbumsDiv>
            {artistAlbums.map((album, index) =>{
            return(
                <Album
                title={album.name}
                image={album.images[1].url}
                albumID={album.id}
                accessToken = {accessToken}
                setMensaje={setMensaje}
                key={index}
                />
            )
            })}
        </AlbumsDiv>
        </ArtistInfo>        
    )
}

export default ArtistAlbums;