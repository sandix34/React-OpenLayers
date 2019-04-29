```jsx
<FondCarteStamenWatercolor />
```

```js static
import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';

import Stamen from 'ol/source/Stamen';

class FondCarteStamenWatercolor extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2 
    };

    // Stamen Watercolor 
    this.StamenWatercolor = new TileLayer({
	title: 'Stamen Watercolor',
	preload: Infinity,
	source: new Stamen({
		layer: 'watercolor',
	}),
	visible: true
    });  

    this.olmap = new Map({
      target: null,
      layers: [this.StamenWatercolor],
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
    this.olmap.setTarget("map11");

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
      <div id="map11" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default FondCarteStamenWatercolor;
```