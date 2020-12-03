```jsx
<GeometryVector />
```

```js static
import React, { Component } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

import Feature from "ol/Feature";
import LineString from "ol/geom/LineString";
import Point from "ol/geom/Point";
import Polygon from "ol/geom/Polygon";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

class GeometryVector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Creation of the Point type geometry
    this.geomPoint = new Point([2.1, 41.23]);
    this.geomPoint.transform("EPSG:4326", "EPSG:3857");
    // Declaration of the geographical object entity
    this.entitePoint = new Feature({
      geometry: this.geomPoint,
      name: "point",
    });

    // Creation of Line type geometry
    this.geomLigne = new LineString([
      [2.2, 42.23],
      [2.8, 39.23],
    ]);
    this.geomLigne.transform("EPSG:4326", "EPSG:3857");
    // Declaration of the geographical object entity
    this.entiteLigne = new Feature({
      geometry: this.geomLigne,
      name: "ligne",
    });

    // Creation of Polygon type geometry
    this.geomPolygone = new Polygon([
      [
        [3.0, 40.0],
        [2.9, 41.0],
        [3.5, 43.0],
        [4.0, 45.0],
        [8.0, 45.0],
        [3.0, 40.0],
      ],
    ]);
    this.geomPolygone.transform("EPSG:4326", "EPSG:3857");
    // Declaration of the geographical object entity
    this.entitePolygone = new Feature({
      geometry: this.geomPolygone,
      name: "Polygone",
    });

    this.source = new VectorSource({
      features: [this.entitePoint, this.entiteLigne, this.entitePolygone],
    });

    // Vector declaration
    this.vecteur = new VectorLayer({
      source: this.source,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vecteur,
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map6");
  }

  render() {
    return <div id="map6" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default GeometryVector;
```
