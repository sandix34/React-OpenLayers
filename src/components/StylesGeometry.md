```jsx
<StylesGeometry/>
```

```js static

import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// classes pour les vecteurs
import GPX from "ol/format/GPX";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Conteneur pour les styles de rendu d'entités vectorielles
import Style from "ol/style/Style";
//Définir le style de trait pour les entités vectorielles
import Stroke from "ol/style/Stroke";
//Définir le style de remplissage pour les entités vectorielles.
import Fill from "ol/style/Fill";
//Définir le style de cercle pour les entités vectorielles.
import CircleStyle from "ol/style/Circle";

class StylesGeometry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Sources de données et couche OpenStreetMap
    this.osm = new TileLayer({
      source: new OSM()
    });

    // Déclaration du style du cercle
    this.styleCercle = new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: "#e8818d"
        }),
        stroke: new Stroke({
          color: "#f53a40",
          width: 1
        }),
        radius: 10
      })
    });

    // Déclaration du style du Polygone
    this.stylePolygone = new Style({
      stroke: new Stroke({
        color: "#0c39ff",
        width: 5
      }),
      fill: new Fill({
        color: "#d9d7eb"
      })
    });

    // Source de données du vecteur en format GeoJSON
    this.sourceGeoJSON = new VectorSource({
      url: "public/data/pays.geojson",
      format: new GeoJSON()
    });

    // Déclaration de la couche vectorielle
    this.vecteurGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON,
      style: this.stylePolygone
    });

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX()
    });

    // Déclaration de la couche vectorielle
    this.vecteurGPX = new VectorLayer({
      source: this.sourceGPX,
      style: this.styleCercle
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [
          this.osm, 
          this.vecteurGeoJSON, 
          this.vecteurGPX
        ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map13");
  }

  render() {
    return <div id="map13" style={{ width: "100%", height: "360px" }} />;
  }
}

export default StylesGeometry;
```