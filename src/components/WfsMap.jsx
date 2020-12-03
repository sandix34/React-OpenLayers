import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";

import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";

/**
 * Le WFS est un protocole HTTP d’échange de données vecteurs qui permet “côté client”
 * de connaître les structures et les sources de la donnée spatiale.
 * En clair, le serveur cartographique fournit une URL avec plusieurs paramètres
 * pour appeler et lister les entités du vecteur dans un format spécifique (XML, JSON, etc).
 *
 * Dans OL, il est alors possible de prendre en charge le protocole WFS
 * comme une source de données vectorielles externe en précisant
 * le format de l'application de l'URL (ici : JSON):
 * @visibleName Le protocole WFS
 */

class WfsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-8233510, 4980620],
      zoom: 13,
    };

    // Declaration of the source of the layer in WFS format
    this.sourceWFS = new VectorSource({
      // Loading the WFS link in json format
      url:
        "https://ahocevar.com/geoserver/wfs?service=WFS&" +
        "version=1.1.0&request=GetFeature&typename=osm:water_areas&" +
        "outputFormat=application/json&srsname=EPSG:3857&",
      format: new GeoJSON(),
      serverType: "geoserver",
    });

    // Declaration of the WFS layer
    this.vecteurWFS = new VectorLayer({
      source: this.sourceWFS,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.vecteurWFS],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map8");
  }

  render() {
    return <div id="map8" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default WfsMap;
