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

/*VIII.1. LA SÉLECTION

La classe ol.interaction.Select, comme son nom l'indique,
permet de sélectionner des entités géographiques du vecteur.
Elle est fournie avec de nombreuses options comme
les conditions de sélection (au clic par exemple),
les filtres de sélection des couches
et la récupération des objets et le style des entités selectionnées.
De manière basique, on instancie la classe puis on l'ajoute à l'objet Map.
Par défaut, la sélection s'applique au clic sur une entité du vecteur avec un style générique.
On note que les entités sélectionnées sont ajoutées à une couche interne à l'API non déclarée dans le script.
*/

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

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map17");

    // Déclaration de l'interaction
    this.interactionSelect = new Select();
    // Ajout de l'interaction à l'objet Map
    this.olmap.addInteraction(this.interactionSelect);

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  render() {
    this.updateMap(); // Update map on render?

    return <div id="map17" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Selection;
