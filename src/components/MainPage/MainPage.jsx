import styled from "styled-components";

const TextMP = styled.h4`
    margin: 3rem 2rem 0 2rem;
    font-weight: bold;
    font-size: 1.3rem;
`

const MainPage = ()=>{

    return(
        <div>
            <TextMP>La página web que estas viendo fue creada utilizando React, Styled Components, React Slick y la API de Spotify. Aquí puedes buscar a tu artista favorito y explorar sus albumes.</TextMP>
        </div>
    )
}

export default MainPage