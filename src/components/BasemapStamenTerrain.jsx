import React, { Component } from "react";
// classes required to display the map
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
// Layer source
import Stamen from "ol/source/Stamen";

/**
 * On appelle communément fonds de carte,
 * un ensemble de données géographiques compilées
 * qui permettent de situer des vecteurs
 * et/ou des rasters spécifiques.
 * Les fonds de carte ont une résolution spatiale
 * et des informations plus ou moins détaillées.
 *
 * OL implémente directement plusieurs d'entre eux dans son API,
 * ainsi on dispose des sources de données tuilées suivantes :
 * BingMaps (avec clé),
 * Stamen,
 * CartoDB (avec clé)
 * et OpenStreetMap (OSM).
 * @visibleName Les fonds de cartes
 */

class BasemapStamenTerrain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Stamen Terrain
    this.StamenTerrain = new TileLayer({
      title: "Stamen Terrain",
      preload: Infinity,
      source: new Stamen({
        layer: "terrain",
      }),
      visible: true,
    });

    // declare the map 
    this.olmap = new Map({
      target: null,
      layers: [this.StamenTerrain],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map10");
  }

  render() {
    return <div id="map10" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default BasemapStamenTerrain;
