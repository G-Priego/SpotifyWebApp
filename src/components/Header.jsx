import React from "react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styled from "styled-components";

const HeaderStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #ffcccc; 
    padding-bottom: 15px;
`

const TitleHeader = styled.h1`
    color: black
    font-family: 'Arial', sans-serif; 
`

const Header = (props) =>{

    const search = props.search
    const setTracks = props.setTracks

    const [artistInput, setArtistInput] = useState("")

    return(
        <HeaderStyle>
            <TitleHeader>Album's</TitleHeader>
            <SearchBar
                val={artistInput}
                setVal={setArtistInput}
            />
            <button onClick={()=>{
                search(artistInput)
                setTracks([])
                }}>Buscar</button>      
        </HeaderStyle>
    )
}

export default Header;