import React from "react";
import styled from "styled-components";

const SingleAlbum = styled.div`
    margin: 1.5rem;
    width: 20em;
    height: 25em;
    padding: 1.5rem;
    background-color: pink;
`

const AlbumTitle = styled.h2`
    text-align: center;
`

const Album = (props) =>{
    
    const title = props.title
    const image = props.image
    const albumID = props.albumID
    const searchAlbum = props.searchAlbum

    if (albumID) {
        props.setMensaje("¡Da click sobre la portada de un album para ver sus canciones!")
    }

        return( 
            <SingleAlbum>
                <img src={image} alt={title} onClick={()=> searchAlbum(albumID)}/>
                <AlbumTitle>{title}</AlbumTitle>
            </SingleAlbum>
            
        )
}
 

export default Album