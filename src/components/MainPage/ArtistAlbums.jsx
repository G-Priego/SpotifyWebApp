import React from "react";
import styled from "styled-components";
import Album from "./Album";

const ArtistInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;
const AlbumsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

`;

const ArtistName = styled.h2`
    font-size: 5em;
    font-weight: 1000;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    padding: 0;
    margin:0;
`;

const ArtistAlbums = (props) =>{
    const { artistAlbums, artistName, accessToken} = props;

    return(
        <ArtistInfo>
        <ArtistName>{artistName}</ArtistName>
        <h3 style={{margin:0}}>¡Da click sobre la portada de un album para ver sus canciones!</h3>
        <AlbumsDiv>
            {artistAlbums.map((album, index) =>{
            return(
                <Album
                title={album.name}
                image={album.images[1].url}
                albumID={album.id}
                accessToken = {accessToken}
                key={index}
                />
            )
            })}
        </AlbumsDiv>
        </ArtistInfo>        
    )
}

export default ArtistAlbums;