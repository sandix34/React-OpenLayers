import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';

 /**
  * -----------------
  * Le protocole WFS
  * ----------------
  * 
  * Le WFS est un protocole HTTP d’échange de données vecteurs qui permet “côté client”
  * de connaître les structures et les sources de la donnée spatiale.
  * En clair, le serveur cartographique fournit une URL avec plusieurs paramètres
  * pour appeler et lister les entités du vecteur dans un format spécifique (XML, JSON, etc).
  * 
  * Dans OL, il est alors possible de prendre en charge le protocole WFS 
  * comme une source de données vectorielles externe en précisant 
  * le format de l'application de l'URL (ici : JSON):
  * 
  */


class CarteWFS extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [-8233510, 4980620], 
        zoom: 13 
    };

    // Déclaration de la source de la couche en format WFS 
    this.sourceWFS = new VectorSource({
	// Chargement du lien WFS en format json
	url: 'https://map.geomatick.com/geoserver/wfs?service=WFS&' +
	'version=1.1.0&request=GetFeature&typename=tiger:tiger_roads&' +
	'outputFormat=application/json',
	format: new GeoJSON(),
	serverType: 'geoserver'
    });

    // Déclaration de la couche WFS 
    this.vecteurWFS = new VectorLayer({ 
	source: this.sourceWFS 
    });

    this.olmap = new Map({
      target: null,
      layers: [this.vecteurWFS],
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
    this.olmap.setTarget("map8");

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
      <div id="map8" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default CarteWFS;