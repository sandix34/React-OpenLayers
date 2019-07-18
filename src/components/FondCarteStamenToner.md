```jsx
<FondCarteStamenToner />
```

``` js static
import React, { Component } from "react";

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';

import Stamen from 'ol/source/Stamen';

class FondCarteStamenToner extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2 
    };

    // Stamen Toner 
    this.StamenToner = new TileLayer({
	title: 'Stamen Toner',
	preload: Infinity,
	source: new Stamen({
		layer: 'toner',
	}),
	visible: true
    });  

    this.olmap = new Map({
      target: null,
      layers: [this.StamenToner],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map12");
  }

  render() {
    return (
      <div id="map12" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default FondCarteStamenToner;
```