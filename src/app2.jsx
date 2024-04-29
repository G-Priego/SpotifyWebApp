import { useState, useEffect } from 'react';
import './App.css'


function App() {

  //Claves de autenticación
  const CLIENT_ID = "dc4127302b51440a8d55753bb577ab1f";
  const CLIENT_SECRET = "13f898f497b24b808ef38da036d5a8f7";

  //Estados del componente
  const [artistAlbums, setArtistAlbums] = useState([])
  const [artistName, setArtistName] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [tracks, setTracks] = useState('')

  //Efecto de la autenticacion al usar
  useEffect(() =>{
    let authParameters ={
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/x-www-form-uriencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + 
      CLIENT_SECRET
    }
    fetch("https://acounts.spotify.com/api/token", authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  },[])

  //Funcion para buscar información del artista
  async function search(artistName){
    let artistParameters = {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + accessToken
      }
    }
  //Obtener el ID del artista
  let artistID = await fetch('https://api.spotify.com/v1/search?q=' +
  artistName + '&type=artist', artistParameters)
  .then(response => response.json())
  .then(data => data.artist.items[0].id)
  //Establecer el nombre del artista
  await fetch('https://api.spotify.com/v1/search?q=' +
  artistName + '&type=artist', artistParameters)
  .then(response => response.json())
  .then(data => setArtistName(data.artists.items[0].name))
  //Obtener los albumnes del artista
  await fetch('https://api.spotify.com/v1/artists' +
  artistID + '/albums?include_groups=album&limit=50', artistParameters)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setArtistAlbums(data.items)
  })
}

//Funcion para buscar las canciones de un album
async function searchAlbum(albumID){
  let albumParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + accessToken
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
      <Header
      search={search}
      setTracks={setTracks}
      />
<MainPage />
<Titles>{artistName}</Titles>
<StyledAlbums>
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
</StyledAlbums>
<CenterSection>
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
    <PlayerImage src=
    'https://static.vecteezy.com/system/resources/previews/010/975/974/non_2x/media-player-video-player-png.png' 
    alt='Reproductor'/>
  </StyledTracks>
</CenterSection>
<TitleDatosCuriosos>Datos Curiosos</TitleDatosCuriosos>
<DatosCuriosos/>
</div>
  );

}
export default App;