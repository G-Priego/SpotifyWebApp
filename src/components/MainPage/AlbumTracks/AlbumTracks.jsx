import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Track from "./Track";

const StyledTracks = styled.div`
  background: #fff;
  width: 20em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 5px 20px 3px rgba(0, 0, 0, 0.6);
  position: absolute;
  font-style: italic;
`;

const AlbumTracks = ({ albumID, accessToken }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      let albumParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      //Obtener las canciones de albums
      await fetch(
        "https://api.spotify.com/v1/albums/" + albumID + "/tracks?limit=50",
        albumParameters
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("recuperando los tracks", data);
          setTracks(data.items);
        })
        .catch((error) => {console.error("Error al recuperar las canciones del album", error)})
    };

    if (albumID) {
      fetchTracks();
    }
  }, [albumID]);

  return (
    <StyledTracks>
      <h2>{tracks.length} canciones</h2>
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
        style={{ width: 300 }}
      />
    </StyledTracks>
  );
};

export default AlbumTracks;
