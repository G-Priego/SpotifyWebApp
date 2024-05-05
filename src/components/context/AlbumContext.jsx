import React, {useState, createContext, useContext} from "react";

const AlbumContext = createContext();

export const useAlbumContext = () => useContext(AlbumContext);

export const AlbumProvider = ({ children, albumProps }) => {
    const [tracks, setTracks] = useState({ albumProps });

    return(
        <AlbumContext.Provider value={tracks}>
            { children }
        </AlbumContext.Provider>
    )
}