import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

import GPX from 'ol/format/GPX';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

/**
 * ---------------------------------
 * Chargement de fichiers externes
 * --------------------------------
 * 
 * Il est courant d'utiliser des sources de données externes tels les fichiers
 * de données ou les protocoles HTTP. Concernant les fichiers, il existe de nombreux formats ol.format
 * de données vectorielles pris en charge par OL.
 * Ici, on considère les formats les plus utilisés en SIG : 
 * GeoJSON, GPX, KML, GML mais on peut citer également les formats TopoJSON, MVT et WKT.
 * Pour afficher ces données géographiques, il suffit d'indiquer le chemin du fichier par l'URL et
 * et le format de données dans la source du vecteur.
 * 
 * L'exemple ci-après met en évidence la lecture d'un vecteur de format
 * GeoJSON et un de format GPX représentant respectivement les pays du monde et les capitales.
 */

class VecteurFichier extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2
    };

    // Source de données du vecteur en format GeoJSON
    this.sourceGeoJSON = new VectorSource({
    url: '../../styleguide/build/data/pays.geojson',
	format: new GeoJSON()
    });
    // Déclaration de la couche vectorielle	
    this.vecteurGeoJSON = new VectorLayer({
	source: this.sourceGeoJSON,
    });

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({ 
	url: '../../styleguide/build/data/capitales.gpx',
	format: new GPX()
    });
    // Déclaration de la couche vectorielle	
    this.vecteurGPX = new VectorLayer({
	source: this.sourceGPX,
    });


    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vecteurGeoJSON,
        this.vecteurGPX
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
    this.olmap.setTarget("map7");

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
      <div id="map7" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default VecteurFichier;