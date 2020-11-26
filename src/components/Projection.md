```jsx
<Projection />
```

```js static
import React, { Component } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import { fromLonLat } from "ol/proj";

class Projection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: fromLonLat([1.3529599, 44.0221252]),
      zoom: 10,
    };

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
    this.olmap.setTarget("map2");
  }

  render() {
    return <div id="map2" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default Projection;
```
