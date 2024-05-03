import React from "react";
import SearchBar from "./SearchBar";
import { useState } from "react";
import styled from "styled-components";

const HeaderStyle = styled.header`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    background-color: #ffcccc; 
    padding-bottom: 15px;
`

const TitleHeader = styled.h1`
    font-family: 'Arial', sans-serif; 
`

const SearchBoxHeader = styled.div`
    display:flex;
    width: 50%;
    align-items: center;
    gap: 2em;
`
const ButtonHeader = styled.button`
    height: fit-content;
    &:hover{
        border: solid 2px grey;
    }
`
const Header = (props) =>{

    const search = props.search
    const setTracks = props.setTracks

    const [artistInput, setArtistInput] = useState("")

    return(
        <HeaderStyle>
            <TitleHeader>Album's</TitleHeader>
            <SearchBoxHeader>
                <SearchBar
                    val={artistInput}
                    setVal={setArtistInput}                    
                />
                <ButtonHeader id="search-btn" onClick={()=>{
                    search(artistInput)
                    setTracks([])
                    }}>Buscar
                </ButtonHeader>   
            </SearchBoxHeader>               
        </HeaderStyle>
    )
}

export default Header;