import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes for vectors
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

// Interaction to modify the geometries of the entities.
import Modify from "ol/interaction/Modify";

/**
 * De même que pour les interactions précédentes,
 * la modification de données vectorielles est réalisée en ajoutant
 * l'interaction ol.interaction.Modify à l'objet Map.
 * On indique la source du vecteur à modifier dans l'objet de l'interaction
 * et d'autres options sont possibles tels le style
 * et les conditions de modifications des sommets.
 * Le code suivant montre la mise en place d'une modification simple.
 * @visibleName La modification
 */

class Modification extends Component {
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
    this.olmap.setTarget("map21");

    // Declaration of interaction
    this.interactionModif = new Modify({
      source: this.sourceGeoJSON,
      //style: styleDessin
    });
    // Add interaction
    this.olmap.addInteraction(this.interactionModif);
  }

  render() {
    return <div id="map21" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Modification;
