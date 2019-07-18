```jsx
<CarteWFS />
```

```js static
import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import 'ol/ol.css';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';

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
	url: "https://ahocevar.com/geoserver/wfs?service=WFS&" +
  "version=1.1.0&request=GetFeature&typename=osm:water_areas&" +
  "outputFormat=application/json&srsname=EPSG:3857&",
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

  componentDidMount() {
    this.olmap.setTarget("map8");
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
```