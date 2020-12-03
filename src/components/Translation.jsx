import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes for vectors
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

// Interaction for the translation (displacement) of the functionalities.
import Translate from "ol/interaction/Translate";

/**
 * La classe ol.interaction.Translate permet de déplacer des entités géographiques du vecteur.
 * Comme les autres interactions, il est possible de spécifier des options
 * comme les conditions de sélection (au clic par exemple),
 * les filtres de sélection des couches
 * et la récupération des objets et le style des entités selectionnées.
 * Ici, on spécifie la couche prise en compte dans la translation.
 * @visibleName La translation
 */

class Translation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Vector data source in GeoJSON format
    this.sourceGeoJSON = new VectorSource({
      url: "public/data/pays.geojson",
      format: new GeoJSON(),
    });

    // Declaration of the vector layer
    this.vecteurGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.vecteurGeoJSON],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map22");

    // Déclaration de l'interaction
    this.translation = new Translate({
      layers: [this.vecteurGeoJSON],
    });
    this.olmap.addInteraction(this.translation);
  }

  render() {
    return <div id="map22" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Translation;
