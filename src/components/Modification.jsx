import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes pour les vecteurs
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

// Interaction pour modifier les géométries des entités.
import Modify from "ol/interaction/Modify";

/**
 * --------------
 * La modification
 * --------------
De même que pour les interactions précédentes,
la modification de données vectorielles est réalisée en ajoutant
l'interaction ol.interaction.Modify à l'objet Map.
On indique la source du vecteur à modifier dans l'objet de l'interaction
et d'autres options sont possibles tels le style
et les conditions de modifications des sommets.
Le code suivant montre la mise en place d'une modification simple.
 */

class Modification extends Component {
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
    this.olmap.setTarget("map21");

    // Déclaration de l'interaction
    this.interactionModif = new Modify({
      source: this.sourceGeoJSON
      //style: styleDessin
    });
    // Ajout de l'interaction
    this.olmap.addInteraction(this.interactionModif);
  }

  render() {
    return <div id="map21" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Modification;
