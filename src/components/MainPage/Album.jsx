import React, { useState } from "react";
import styled from "styled-components";
import AlbumTracks from "./AlbumTracks/AlbumTracks";

const SingleAlbum = styled.div`
  margin: 1.5rem;
  width: 20em;
  height: 25em;
  padding: 1.5rem;
  background-color: pink;
`;

const AlbumTitle = styled.h2`
  text-align: center;
`;

const Album = (props) => {
  const { title, image, albumID, accessToken, setMensaje } = props;
  const [mostrarTracks, setMostrarTracks] = useState(false);

  const handleAlbumClick = () =>{
    setMostrarTracks(!mostrarTracks);
  }

  if (albumID) {
    setMensaje("¡Da click sobre la portada de un album para ver sus canciones!");
  }
  return (
    <SingleAlbum>
      <img src={image} alt={title} onClick={handleAlbumClick} />
      <AlbumTitle>{title}</AlbumTitle>
      {mostrarTracks && <AlbumTracks albumID = {albumID} accessToken={accessToken}/>}
    </SingleAlbum>
  );
};

export default Album;
