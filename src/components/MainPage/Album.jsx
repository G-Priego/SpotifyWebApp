import React, { useState } from "react";
import styled from "styled-components";
import AlbumTracks from "./AlbumTracks/AlbumTracks";

const SingleAlbum = styled.div`
margin:1.5em;
  width: 20em;
  height: 25em;
  padding: 1.5rem;
`;

const AlbumTitle = styled.h2`
  text-align: center;
`;

const Album = (props) => {
  const { title, image, albumID, accessToken } = props;
  const [mostrarTracks, setMostrarTracks] = useState(false);

  const handleAlbumClick = () =>{
    setMostrarTracks(!mostrarTracks);
  }

  return (
    <SingleAlbum>
      <img style={{cursor:"pointer"}} src={image} alt={title} onClick={handleAlbumClick} />
      <AlbumTitle>{title}</AlbumTitle>
      {mostrarTracks && <AlbumTracks albumID = {albumID} accessToken={accessToken}/>}
    </SingleAlbum>
  );
};

export default Album;
