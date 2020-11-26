```jsx
<MapOl />
```

```js static
import React, { Component } from "react";
// classes required to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

class MapOl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 1,
    };
    // declare the map
    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map1");
  }

  render() {
    return <div id="map1" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default MapOL;
```
