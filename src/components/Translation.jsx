import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes pour les vecteurs
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

// Interaction pour la traduction (déplacement) des fonctionnalités.
import Translate from "ol/interaction/Translate";

/**
 * --------------
 * La translation
 * --------------
La classe ol.interaction.Translate permet de déplacer des entités géographiques du vecteur.
Comme les autres interactions, il est possible de spécifier des options
comme les conditions de sélection (au clic par exemple),
les filtres de sélection des couches
et la récupération des objets et le style des entités selectionnées.
Ici, on spécifie la couche prise en compte dans la translation.
 */

class Translation extends Component {
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
    this.olmap.setTarget("map22");

    // Déclaration de l'interaction
    this.translation = new Translate({
      layers: [this.vecteurGeoJSON]
    });
    this.olmap.addInteraction(this.translation);
  }

  render() {
    return <div id="map22" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Translation;
