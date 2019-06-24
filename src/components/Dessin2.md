```jsx
<Dessin2/>
```

```js static
import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes pour les vecteurs
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

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

class Dessin2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Déclaration du style du vecteur
    this.styleVecteur = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)"
      }),
      stroke: new Stroke({
        color: "rgba(20, 255, 50, 1.0)",
        width: 2
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
      style: this.styleVecteur
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [this.vecteurGeoJSON],
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
    this.olmap.setTarget("map20");

    // Déclaration de l'interaction
    this.interactionDraw = new Draw({
      type: "Polygon",
      source: this.sourceGeoJSON,
      style: this.styleDessin
    });

    // Ajout de l'interaction
    this.olmap.addInteraction(this.interactionDraw);
  }

  render() {
    return <div id="map20" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Dessin2;

```