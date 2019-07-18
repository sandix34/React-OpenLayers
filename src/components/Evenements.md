```jsx
<Evenements />
```

```js static
import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class Evenements extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        center: [0, 0], 
        zoom: 2 
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
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map5");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      console.log(zoom);
      
      this.setState({ center, zoom });
    });
  }

  render() {
    return (
      <div id="map5" style={{ width: "100%", height: "360px" }}>
      </div>
    );
  }
}

export default Evenements;

```