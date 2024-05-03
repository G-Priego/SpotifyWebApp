import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import Album from "./components/MainPage/Album";
import Track from "./components/AlbumTracks/Track";
import styled from "styled-components";
import ArtistAlbums from "./components/MainPage/ArtistAlbums";
import AlbumTracks from "./components/AlbumTracks/AlbumTracks";

function App() {
  const CLIENT_ID = "9ac1b0aeb43f4d27a75b13e7b7f639a2";
  const CLIENT_SECRET = "fd2224d42c0849adbe62fe0a7649b014";

  //Estados del componente
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  //Efecto de la autenticación al usar
  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => console.error("Authentication error:", error));

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => {
        setAccessToken(data.access_token);
        setLoading(false); // Indica que la carga ha finalizado
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        setLoading(false); // Manejo del error de autenticación
      });
  }, []);

  //Función para buscar información del artista
  async function search(artistName) {
    let artistParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application.json",
        Authorization: "Bearer " + accessToken,
      },
    };
    //Obtener el ID del artista
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => data.artists.items[0].id);

    //Establecer el nombre del artista
    await fetch(
      "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => setArtistName(data.artists.items[0].name));

    //Obtener los albumes del artista
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&limit=50",
      artistParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtistAlbums(data.items);
      });
  }

  //Funcion para buscar las canciones de un album
  async function searchAlbum(albumID) {
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
        console.log(data);
        setTracks(data.items);
      });
  }

  console.log(tracks);

  return (
    <div className="App">
      {loading ? (<p>Loading...</p>) :
      (
        <div>
          <Header search={search} setTracks={setTracks} />
          <MainPage />
          <ArtistAlbums artistAlbums = {artistAlbums} searchAlbum = {searchAlbum} artistName = {artistName}/>
          <AlbumTracks tracks = {tracks}/>
        </div>
      )}
    </div>
  );
}

export default App;
