```jsx
<VecteurFichier />
```

```js static
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

class VecteurFichier extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2
    };

    // Source de données du vecteur en format GeoJSON
    this.sourceGeoJSON = new VectorSource({
    url: '../../public/data/pays.geojson',
	format: new GeoJSON()
    });
    // Déclaration de la couche vectorielle	
    this.vecteurGeoJSON = new VectorLayer({
	source: this.sourceGeoJSON,
    });

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({ 
	url: '../../public/data/capitales.gpx',
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
```