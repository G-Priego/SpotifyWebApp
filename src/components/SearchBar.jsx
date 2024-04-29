import styled from "styled-components";

const InputBar = styled.div`
    margin-top: 2rem;
    display:flex;
    flex-direction: column;
    background-color: #ffcccc;
    border-radius: 8px;
    padding: 0.5rem;
`

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
    return(
        <InputBar>
            <InputText
                placeholder="¡Busca a tu artista favorito!"
                required
                value={props.val}
                onChange={handleInput}
                type="text"
            />
        </InputBar>
    )
}

export default SearchBar