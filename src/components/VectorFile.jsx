import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

import GPX from "ol/format/GPX";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

/**
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
 * @visibleName Chargement de fichiers externes
 */

class VectorFile extends Component {
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
    this.vectorGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON,
    });

    // Vector data source in GPX format
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX(),
    });
    // Declaration of the vector layer
    this.vectorGPX = new VectorLayer({
      source: this.sourceGPX,
    });

    // declare the map
    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorGeoJSON,
        this.vectorGPX,
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map7");
  }

  render() {
    return <div id="map7" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default VectorFile;
