import React from "react";

const AlbumData = (props) => {
    
    const {songName, preview} = props


    return(
        <div>
            <p onClick={() => window.open(preview)}>{songName}</p>
        </div>
    )

}

export default AlbumData