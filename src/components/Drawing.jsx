import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// classes for vectors
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

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

/**
 * Créer de nouvelles entités géographiques avec OL est rendu possible
 * grâce à la classe ol.interaction.Draw.
 * Qui dit création d'une entité dit forcément réception de cette donnée
 * dans une source vectorielle. Ainsi, il est indispensable de préciser
 * la source de donnée à l'objet de l'interaction ainsi que la géométrie dessinée.
 * Le script suivant permet de créer des points et on ajoute un style spécifique à
 * l'interaction qui est différente de celui du vecteur.
 * @visibleName Le dessin 1
 */

class Drawing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    // Data source and OpenStreetMap layer
    this.osm = new TileLayer({
      source: new OSM(),
    });

    // Creating a vector data source
    this.sourceVecteur = new VectorSource();

    // Vector creation
    this.vecteur = new VectorLayer({
      source: this.sourceVecteur,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.vecteur],
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
    this.olmap.setTarget("map19");

    // Declaration of interaction
    this.interactionDraw = new Draw({
      type: "Polygon",
      source: this.sourceVecteur,
      style: this.styleDessin,
    });
    // Add interaction
    this.olmap.addInteraction(this.interactionDraw);
  }

  render() {
    return <div id="map19" style={{ width: "100%", height: "360px" }} />;
  }
}

export default Drawing;
