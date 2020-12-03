```jsx
<VectorFile />
```

```js static
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
```
