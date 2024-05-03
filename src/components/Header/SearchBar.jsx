import styled from "styled-components";

const InputText = styled.input`
    padding: 0.5rem 3.5rem;
    text-align: center;
    border-radius: 50px;
    font-size: 1.2rem;
    ::placeholder{
        color:black;
    }
`

const SearchBar = (props) =>{

    const handleInput = (e) =>{
        props.setVal(e.target.value)
    }

    const handleKeyDown = (e) =>{
        if (e.key === "Enter") {
            document.getElementById("search-btn").click();
        }
    }
    return(
        <InputText
            placeholder="¡Busca a tu artista favorito!"
            required
            value={props.val}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            type="text"
        />
        
    )
}

export default SearchBar