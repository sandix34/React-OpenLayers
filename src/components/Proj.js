import React, { Component } from "react";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj';


 /**
 * -----------------------------
 * Changer la projection
 * -----------------------------
 * 
 * Il est possible de spécifier plusieurs options dans la vue
 * comme la résolution de la carte, la rotation et la projection 
 * ol.proj  qui par défaut, est l'EPSG:3857 et l'EPSG:4326 est aussi chargée.
 * Le code suivant introduit le centrage de la 
 * carte avec une transformation de la projection des coordonnées
 * géographiques.
 * 
 * https://openlayers.org/en/latest/apidoc/module-ol_proj.html
 */

class Projection extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: fromLonLat([1.3529599,44.0221252]), 
        zoom: 10 
    };

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
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
    this.olmap.setTarget("map2");

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
    return (
      <div id="map2" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default Projection;