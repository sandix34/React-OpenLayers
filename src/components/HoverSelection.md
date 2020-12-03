```jsx
<HoverSelection/>
```

```js static
import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";

// classes for vectors
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Container for vector feature rendering styles
import Style from "ol/style/Style";
// Set the line style for vector entities
import Stroke from "ol/style/Stroke";
// Define the fill style for vector entities.
import Fill from "ol/style/Fill";

// Interaction for the selection of vector entities.
import Select from "ol/interaction/Select";
import { pointerMove } from "ol/events/condition";

class HoverSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Vector data source in GeoJSON format
    this.sourceGeoJSON = new VectorSource({
      url: "public/data/pays.geojson",
      format: new GeoJSON(),
    });

    // Declaration of the vector layer
    this.vecteurGeoJSON = new VectorLayer({
      source: this.sourceGeoJSON,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.vecteurGeoJSON],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });

    // Declaring the Style of the Selected Polygon
    this.styleSelect = new Style({
      stroke: new Stroke({
        color: "rgba(0,0,255,1)",
        width: 5,
      }),
      fill: new Fill({
        color: "rgba(0,0,255,0.1)",
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map18");

    // Declaration of interaction with options
    this.interactionSelect = new Select({
      // Hover selection
      condition: pointerMove,
      // Selection style
      style: this.styleSelect,
    });

    // Adding the interaction to the Map object
    this.olmap.addInteraction(this.interactionSelect);

    // We load the hovered entities (option: features) in a variable
    this.entitesSelect = this.interactionSelect.getFeatures();

    // Retrieving the properties of the entity selected during the selection
    this.entitesSelect.on("add", (e) => {
      // Object of the entity
      this.entite = e.target.item(0);
      // Property
      this.proprieteEntite = this.entite.getProperties();
      // Geometry
      this.geomEntite = this.entite.getGeometry();
      // Attribute
      this.attributEntite = this.entite.get("name");
      console.log(this.attributEntite);
    });
  }

  render() {
    return <div id="map18" style={{ width: "100%", height: "360px" }} />;
  }
}

export default HoverSelection;
```