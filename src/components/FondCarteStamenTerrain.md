```jsx
<FondCarteStamenTerrain />

```

```js static
import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';

import Stamen from 'ol/source/Stamen';
//import BingMaps from 'ol/source/BingMaps';

class FondCarteStamenTerrain extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2 
    };

/**
    // Bing Aerial 

    this.cleBingMaps='votre clé';
    this.BingAerial = new TileLayer({
          title: 'Bing Aerial',
          preload: Infinity,
          source: new BingMaps({
          key: this.cleBingMaps,
          imagerySet: 'Aerial'
          }),
      visible: true
    });

    // Bing Aerial With Labels

      this.BingAerialWithLabels = new TileLayer({
          title: 'Bing Aerial With Labels',
          preload: Infinity,
          source: new BingMaps({
          key: this.cleBingMaps,
          imagerySet: 'AerialWithLabels'
          }),
      visible: false

*/

  // Stamen Terrain 
    this.StamenTerrain = new TileLayer({
	title: 'Stamen Terrain',
	preload: Infinity,
	source: new Stamen({
		layer: 'terrain',
	}),
	visible: true
    });  

    this.olmap = new Map({
      target: null,
      layers: [this.StamenTerrain],
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
    this.olmap.setTarget("map10");

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
      <div id="map10" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default FondCarteStamenTerrain;
```