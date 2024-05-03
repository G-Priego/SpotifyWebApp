import React from "react";
import styled from "styled-components";
import Track from "./Track";

const StyledTracks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  background-image: url("https://www.todofondos.net/wp-content/uploads/papel-arrugado-textura-dorada-scaled.jpg");
  width: fit-content;
  font-weight: bold;
  padding: 0.5rem;
  box-shadow: -8px 22px 26px -3px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -8px 22px 26px -3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -8px 22px 26px -3px rgba(0, 0, 0, 0.75);
  font-family: "Special Elite", cursive;
`;

const AlbumTracks = (props) =>{
    const tracks = props.tracks;
    if (tracks.length) {
        return (
      <StyledTracks>
        <h2>Canciones del album seleccionado:</h2>
        {tracks.map((track, index) => {
          return (
            <Track
              songName={track.name}
              preview={track.external_urls.spotify}
              key={index}
            />
          );
        })}
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/975/974/non_2x/media-player-video-player-png.png"
          alt="Reproductor"
          style={{width: 300}}
        />
      </StyledTracks>
    );
    }
    return(
        <></>
    )
}

export default AlbumTracks;

