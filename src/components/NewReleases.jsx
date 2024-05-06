import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/styles/CenterMode.css";
import Album from "./MainPage/Album";

const NewReleases = ({ accessToken }) => {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      let albumParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      //Obtener albums recientes
      await fetch(
        `https://api.spotify.com/v1/browse/new-releases?limit=10`,
        albumParameters
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("recuperando los albums mas recientes", data);
          setNewReleases(data.albums.items);
        })
        .catch((error) => {
          console.error("Error al recuperar los albums recientes", error);
        });
    };

    fetchNewReleases();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {newReleases.map((album, index) => (
          <div className="albumCover-slider" key={index}>
            <img src={album.images[0].url} alt={album.name} onClick={() => window.open(album.external_urls.spotify)}/>
            <div className="title-centered">
                {album.name}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewReleases;
