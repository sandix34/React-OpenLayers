import React, { Component } from "react";

// classes required to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// classes for vectors
import GPX from "ol/format/GPX";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Container for vector feature rendering styles
import Style from "ol/style/Style";
// Set the line style for vector entities
import Stroke from "ol/style/Stroke";
// Define the fill style for vector entities.
import Fill from "ol/style/Fill";
// Define the text style for vector entities.
import Text from "ol/style/Text";
// Define the circle style for vector entities.
import CircleStyle from "ol/style/Circle";

// Source layer to group vector data.
import Cluster from "ol/source/Cluster";

/**
 * Les clusters permettent de regrouper et de montrer le nombre
 * d'entités géographiques d'un vecteur en focntion d'un niveau de zoom sur la carte.
 * @visibleName Les Clusters
 */


class Clusters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Data sources and OpenStreetMap layer
    this.osm = new TileLayer({
      source: new OSM(),
    });

    // Vector data source in GPX format
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX(),
    });

    // Cluster Source
    this.clusterSource = new Cluster({
      distance: 40,
      source: this.sourceGPX,
    });

    // Declaration of the cluster layer
    this.clusters = new VectorLayer({
      source: this.clusterSource,
      // Fonction de style
      style: (feature) => {
        // Number of Entities in a class
        this.entityNumber = feature.get("features").length;
        if (this.entityNumber < 5) {
          this.rayon = 10;
          this.outlineColor = "rgba(0,0,255,1)";
          this.fillingColor = "rgba(0,0,255,0.2)";
        } else if (this.entityNumber >= 5 && this.entityNumber < 10) {
          this.rayon = 14;
          this.outlineColor = "rgba(50,255,100,1)";
          this.fillingColor = "rgba(50,255,100,0.2)";
        } else if (this.entityNumber >= 10) {
          this.rayon = 16;
          this.outlineColor = "rgba(255,0,0,1)";
          this.fillingColor = "rgba(255,0,0,0.2)";
        }
        this.style = new Style({
          image: new CircleStyle({
            radius: this.rayon,
            stroke: new Stroke({
              color: this.outlineColor,
            }),
            fill: new Fill({
              color: this.fillingColor,
            }),
          }),
          text: new Text({
            text: this.entityNumber.toString(),
            font: "bold 16px Times New Roman",
            fill: new Fill({
              color: this.outlineColor,
            }),
          }),
        });
        return [this.style];
      },
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.clusters],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map16");
  }

  render() {
    return <div id="map16" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Clusters;
