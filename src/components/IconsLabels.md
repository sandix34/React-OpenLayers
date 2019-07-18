```jsx
<IconsLabels/>
```
```js static

import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// méthode utilitaire pour la projection
import { fromLonLat } from "ol/proj";

// classes pour les vecteurs
import GPX from "ol/format/GPX";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Conteneur pour les styles de rendu d'entités vectorielles
import Style from "ol/style/Style";

//Définir le style d'icône pour les entités vectorielles.
import Icon from "ol/style/Icon";

class IconsLabels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: fromLonLat([2.3439, 48.8579]),
      zoom: 10
    };

    // Sources de données et couche OpenStreetMap
    this.osm = new TileLayer({
      source: new OSM()
    });

    // Style du point avec un icône
    this.iconStyle = new Style({
      image: new Icon(
        /** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          anchorOrigin: "bottom-left",
          src: "../images/icon.png",
          scale: 0.3
        })
      )
    });

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX()
    });

    // Déclaration de la couche vectorielle
    this.vecteurGPX2 = new VectorLayer({
      source: this.sourceGPX,
      style: this.iconStyle
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [
          this.osm, 
          this.vecteurGPX2
        ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map14");
  }

  render() {
    return <div id="map14" style={{ width: "100%", height: "360px" }} />;
  }
}

export default IconsLabels;

```