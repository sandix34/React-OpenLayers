import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes for vectors
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Interaction for the selection of vector entities.
import Select from "ol/interaction/Select";

/** La classe ol.interaction.Select, comme son nom l'indique,
 * permet de sélectionner des entités géographiques du vecteur.
 * Elle est fournie avec de nombreuses options comme
 * les conditions de sélection (au clic par exemple),
 * les filtres de sélection des couches
 * et la récupération des objets et le style des entités selectionnées.
 * De manière basique, on instancie la classe puis on l'ajoute à l'objet Map.
 * Par défaut, la sélection s'applique au clic sur une entité du vecteur avec un style générique.
 * @visibleName La sélection au clic
 */

class ClickSelection extends Component {
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
    this.olmap.setTarget("map17");

    // Declaration of interaction
    this.interactionSelect = new Select();
    // Adding the interaction to the Map object
    this.olmap.addInteraction(this.interactionSelect);
  }

  render() {
    return <div id="map17" style={{ width: "100%", height: "360px" }} />;
  }
}

export default ClickSelection;
