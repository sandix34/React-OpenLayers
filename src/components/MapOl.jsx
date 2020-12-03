import React, { Component } from "react";
// classes required to display the map
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

/**
 * Concepts de base - Le composant principal d' OpenLayers
 * https://openlayers.org/en/latest/doc/tutorials/concepts.html
 *
 * Conventions de module et de nommage
 * https://openlayers.org/en/latest/doc/tutorials/background.html
 *
 * Mettre une carte sur une page
 * https://openlayers.org/en/latest/doc/quickstart.html
 * @visibleName Afficher une carte
 */

class MapOl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 1,
    };
    // declare the map
    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map1");
  }

  render() {
    return <div id="map1" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default MapOl;
