import './App.css';
import MainPage from './components/MainPage';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import ArtistData from './components/ArtistData';
import AlbumData from './components/AlbumData';
import styled from 'styled-components';

const StyledTracks = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  background-image: url('https://www.todofondos.net/wp-content/uploads/papel-arrugado-textura-dorada-scaled.jpg');
  width: fit-content;
  font-weight: bold;
  padding: 0.5rem;
  box-shadow: -8px 22px 26px -3px rgba(0,0,0,0.75);
  -webkit-box-shadow: -8px 22px 26px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: -8px 22px 26px -3px rgba(0,0,0,0.75);
  font-family: 'Special Elite', cursive;
`

function App() {
  const clientId = "efa5edf7528f4198a85d63506812d048"
  const clientSecret = "60274c23d47c4cd6a668bd26068b3441" 

  //Estados del componente
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState([])

  const [loading, setLoading] = useState(true);

  //Efecto de la autenticación al usar
  useEffect(() => {
    let authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }
            return response.json();
        })
        .then(data => setAccessToken(data.accessToken))
        .catch(error => console.error('Authentication error:', error));

    fetch("https://accounts.spotify.com/api/token", authParameters)
        .then(response => response.json())
        .then(data => {
            setAccessToken(data.access_token);
            setLoading(false); // Indica que la carga ha finalizado
        })
        .catch(error => {
            console.error('Authentication error:', error);
            setLoading(false); // Manejo del error de autenticación
        });
}, []);

  //Función para buscar información del artista
async function search(artistName){

  let artistParameters ={
    method: 'GET',
    headers:{
      'Content-Type': 'application.json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
//Obtener el ID del artista
  let artistID = await fetch('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist', artistParameters)
    .then(response => response.json())
    .then(data => data.artists.items[0].id)

//Establecer el nombre del artista
  await fetch('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist', artistParameters)
  .then(response => response.json())
  .then(data => setArtistName(data.artists.items[0].name))

//Obtener los albumes del artista
  await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&limit=50', artistParameters)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      setArtistAlbums(data.items)
  } )
}

//Funcion para buscar las canciones de un album
async function searchAlbum(albumID){
  let albumParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
//Obtener las canciones de albums
await fetch('https://api.spotify.com/v1/albums/'+ albumID + '/tracks?limit=50',
albumParameters) 
.then(response => response.json())
.then(data => {
  console.log(data)
  setTracks(data.items)
}) 

}

console.log(tracks);

return (
  <div className="App">
    {loading ? (
            <p>Loading...</p>
        ) : (
    <div>
    <Header
      search={search}
      setTracks={setTracks}
    />
<MainPage />
<h2>{artistName}</h2>

  {artistAlbums.map((album, index) =>{
    return(
    <ArtistData
      title={album.name}
      image={album.images[1].url}
      searchAlbum={searchAlbum}
      albumID={album.id}
      key={index}
      />
    )
})}

<StyledTracks>
  <h2>Canciones del album seleccionado:</h2>
  {tracks.map((track, index) => {
    return(
      <AlbumData
      songName={track.name}
      preview={track.external_urls.spotify}
      key={index}
      />
    )
  })}
  <img src=
  'https://static.vecteezy.com/system/resources/previews/010/975/974/non_2x/media-player-video-player-png.png' 
  alt='Reproductor'/>
</StyledTracks>
</div>
)}
  </div>
);
}

export default App;