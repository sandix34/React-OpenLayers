```jsx
<Controles/>
```


```js static
import React, { Component } from "react";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj';

import { defaults, OverviewMap, MousePosition, FullScreen, Rotate, ZoomSlider, ZoomToExtent, ScaleLine } from 'ol/control.js';

class Controles extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: fromLonLat([1.3529599,44.0221252]), 
        zoom: 10 
    };

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      }),
      controls: defaults({
                  attribution : true,
                  zoom : true,
            }).extend([
              new FullScreen(),
              new MousePosition(),
              new OverviewMap(),
              new Rotate(),
              new ScaleLine(),
              new ZoomSlider(),
              new ZoomToExtent(),
            ])
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map4");

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
      <div id="map4" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default Controles;

```