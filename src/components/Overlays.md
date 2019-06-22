```jsx
<Overlays/>
```

```js static
import React, { Component } from "react";

// classes required to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// utility method for projection
import { fromLonLat } from "ol/proj";
// An item to display on the map and associated with a single map slot
import Overlay from "ol/Overlay";

class Overlays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Data sources and the OpenStreetMap layer
    this.osm = new TileLayer({
      source: new OSM()
    });

    // Declaration of the map
    this.olmap = new Map({
      target: null,
      layers: [this.osm],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map15");

    // Déclaration of the Marker
    this.marker = new Overlay({
      position: fromLonLat([-43.3307, -22.9201]),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false
    });
    //console.log(this.marker);

    // Adding to the Map Object
    this.olmap.addOverlay(this.marker);
    console.log(this.olmap);
  }

  render() {
    return (
      <>
        <div id="map15" style={{ width: "100%", height: "360px" }} />

        {/* Marker */}
        <div
          id="marker"
          title="Marker"
          style={{
            width: "20px",
            height: "20px",
            border: "1px solid #088",
            borderRadius: "10px",
            backgroundColor: "#0FF",
            opacity: "0.5"
          }}
        />
      </>
    );
  }
}

export default Overlays;
```