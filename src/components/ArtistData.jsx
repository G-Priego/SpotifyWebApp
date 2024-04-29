import React from "react";
import styled from "styled-components";

const SingleAlbum = styled.div`
    margin: 1.5rem;
    width: 300px;
    height: 350px;
    padding: 1.5rem;
`

const AlbumTitle = styled.h2`
    text-align: center;
`

const ArtistData = (props) =>{
    
    const title = props.title
    const image = props.image
    const albumID = props.albumID
    const searchAlbum = props.searchAlbum

        return(
            <SingleAlbum>
                <img src={image} alt={title} onClick={()=> searchAlbum(albumID)}/>
                <AlbumTitle>{title}</AlbumTitle>
            </SingleAlbum>
        )
}
 

export default ArtistData