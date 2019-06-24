```jsx
<Dessin/>
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

// Interaction pour dessiner les géométries des entités.
import Draw from "ol/interaction/Draw";

class Dessin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Source de données et couche OpenStreetMap
    this.osm = new TileLayer({
      source: new OSM()
    });

    // Création d'une source de données vectorielles
    this.sourceVecteur = new VectorSource();

    // Création du vecteur
    this.vecteur = new VectorLayer({
      source: this.sourceVecteur
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.vecteur],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });

    // Déclaration du style de l'interaction
    this.styleDessin = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)"
      }),
      stroke: new Stroke({
        color: "rgba(255, 0, 0, 1.0)",
        lineDash: [10, 10],
        width: 2
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: "rgba(255, 0, 0, 0.85)"
        }),
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.85)"
        })
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map19");

    // Déclaration de l'interaction
    this.interactionDraw = new Draw({
      type: "Polygon",
      source: this.sourceVecteur,
      style: this.styleDessin
    });
    // Ajout de l'interaction
    this.olmap.addInteraction(this.interactionDraw);
  }

  render() {
    return <div id="map19" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Dessin;
```