```jsx
<Selection/>
```

```js static
import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes pour les vecteurs
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Interaction pour la sélection d'entités vectorielles.
import Select from "ol/interaction/Select";

class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Source de données du vecteur en format GeoJSON
    this.sourceGeoJSON = new VectorSource({
      url: "public/data/pays.geojson",
      format: new GeoJSON()
    });

    // Déclaration de la couche vectorielle
    this.vecteurGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON
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
  }

  componentDidMount() {
    this.olmap.setTarget("map17");

    // Déclaration de l'interaction
    this.interactionSelect = new Select();
    // Ajout de l'interaction à l'objet Map
    this.olmap.addInteraction(this.interactionSelect);
  }

  render() {

    return <div id="map17" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Selection;
```