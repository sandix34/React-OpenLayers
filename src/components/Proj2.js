import React, { Component } from "react";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {transform} from 'ol/proj';
import {get as getProjection} from 'ol/proj';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';


/**
 * ------------------------
 * Projections différentes
 * ------------------------
 * Pour utiliser des projections différentes, que ce soit dans l'option même de la vue ou
 *  pour les couches SIG, il est indispensable de charger la libraire Proj4js.
 * (http://proj4js.org/) 
 * 
 * Dans l'exemple ci-après, on utilise la projection Lambert 93 (EPSG:2154) 
 * que l'on déclare dans un premier temps puis on l'affecte à l'objet ol.View.
 */

class Projection2 extends Component {

  constructor(props) {
    super(props);

    this.state = { 
        center: [2, 45] , 
        zoom: 3,
        projection: getProjection('EPSG:2154') 
    };


    //déclaration de la projection en EPSG:2154 (Lambert 93)
    this.proj4 =  proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    this.proj4Register = register(proj4);

    this.centerTransform = transform(this.state.center,'EPSG:4326', 'EPSG:2154')

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: this.state.projection,  
        center: this.centerTransform,
        zoom: this.state.zoom
      })
    });
  }


  updateMap() {
    this.olmap.getView().setCenter(this.centerTransform);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map3");

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
      <div id="map3" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default Projection2;