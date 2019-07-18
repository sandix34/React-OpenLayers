```jsx
<SelectionSurvol/>
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

// Conteneur pour les styles de rendu d'entités vectorielles
import Style from "ol/style/Style";
//Définir le style de trait pour les entités vectorielles
import Stroke from "ol/style/Stroke";
//Définir le style de remplissage pour les entités vectorielles.
import Fill from "ol/style/Fill";

// Interaction pour la sélection d'entités vectorielles.
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";

class SelectionSurvol extends Component {
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

    // Déclaration du style du Polygone Sélectionné
    this.styleSelect = new Style({
      stroke: new Stroke({
        color: "rgba(0,0,255,1)",
        width: 5
      }),
      fill: new Fill({
        color: "rgba(0,0,255,0.1)"
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map18");

    // Déclaration de l'interaction avec des options
    this.interactionSelect = new Select({
        // Sélection au survol
        condition: pointerMove,
        // Style de la sélection
        style: this.styleSelect
      });
      

    // Ajout de l'interaction à l'objet Map
    this.olmap.addInteraction(this.interactionSelect);

    // On charge les entités survolées (option : features) dans une variable
    this.entitesSelect = this.interactionSelect.getFeatures();

    // Récupération des propriétés de l'entité sélectionnée lors de la sélection
    this.entitesSelect.on("add", e => {
      // Objet de l'entité
      this.entite = e.target.item(0);
      // Propriété
      this.proprieteEntite = this.entite.getProperties();
      // Géométrie
      this.geomEntite = this.entite.getGeometry();
      // Attribut
      this.attributEntite = this.entite.get("name");
      console.log(this.attributEntite);
    });
  }

  render() {

    return <div id="map18" style={{ width: "100%", height: "360px" }} />;
  }
}

export default SelectionSurvol;
```