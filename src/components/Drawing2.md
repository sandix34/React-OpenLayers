```jsx
<Drawing2 />
```

```js static
import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes for vectors
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

// Container for vector feature rendering styles
import Style from "ol/style/Style";
// Set the line style for vector entities
import Stroke from "ol/style/Stroke";
// Define the fill style for vector entities.
import Fill from "ol/style/Fill";
// Define the circle style for vector entities.
import CircleStyle from "ol/style/Circle";

// Interaction to draw the geometries of the entities.
import Draw from "ol/interaction/Draw";

class Drawing2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Vector style statement
    this.styleVecteur = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "rgba(20, 255, 50, 1.0)",
        width: 2,
      }),
    });

    // Vector data source in GeoJSON format
    this.sourceGeoJSON = new VectorSource({
      url: "public/data/pays.geojson",
      format: new GeoJSON(),
    });

    // Declaration of the vector layer
    this.vecteurGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON,
      style: this.styleVecteur,
    });

    // declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.vecteurGeoJSON],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });

    // Interaction style declaration
    this.styleDessin = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "rgba(255, 0, 0, 1.0)",
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: "rgba(255, 0, 0, 0.85)",
        }),
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.85)",
        }),
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map20");

    // Declaration of interaction
    this.interactionDraw = new Draw({
      type: "Polygon",
      source: this.sourceGeoJSON,
      style: this.styleDessin,
    });

    // Add interaction
    this.olmap.addInteraction(this.interactionDraw);
  }

  render() {
    return <div id="map20" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Drawing2;
```
