import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// classes for vectors
import GPX from "ol/format/GPX";
import GeoJSON from "ol/format/GeoJSON";
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

/**
 * Si on considère les géométries basiques d'une entité géographique,
 * c'est-à-dire un point, une ligne, un polygone ou un cercle,
 * de quoi a-t-on besoin à minima pour les observer?
 * un contour ol.style.Stroke  pour lequel on associe une couleur, un type de ligne et une épaisseur ;
 * un remplissage ol.style.Fill  pour lequel on associe une couleur ;
 * et pour le cercle ol.style.Circle , une dimension de rayon radius.
 * On note que la classe ol.style.Circle ainsi que les classes ol.style.Icon et ol.style.
 * RegularShape sont des sous-classes de ol.style.Image .
 * La couleur ol.color  est définie par des codes hexadécimaux ou le rgba.
 * Ainsi, par défaut, OL affecte le style suivant au données vectorielles :
 * @visibleName Les Styles pour les différentes géométries
 */

class GeometryStyles extends Component {
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

    // Circle style declaration
    this.styleCercle = new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: "#e8818d",
        }),
        stroke: new Stroke({
          color: "#f53a40",
          width: 1,
        }),
        radius: 10,
      }),
    });

    // Polygon style declaration
    this.stylePolygone = new Style({
      stroke: new Stroke({
        color: "#0c39ff",
        width: 5,
      }),
      fill: new Fill({
        color: "#d9d7eb",
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
      style: this.stylePolygone,
    });

    // Vector data source in GPX format
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX(),
    });

    // Declaration of the vector layer
    this.vecteurGPX = new VectorLayer({
      source: this.sourceGPX,
      style: this.styleCercle,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.vecteurGeoJSON, this.vecteurGPX],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map13");
  }

  render() {
    return <div id="map13" style={{ width: "100%", height: "360px" }} />;
  }
}

export default GeometryStyles;
