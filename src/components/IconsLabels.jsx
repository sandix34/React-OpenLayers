import React, { Component } from "react";

// classes needed to display the map
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// utility method for projection
import { fromLonLat } from "ol/proj";

// classes for vectors
import GPX from "ol/format/GPX";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Container for vector feature rendering styles
import Style from "ol/style/Style";

// Set icon style for vector entities.
import Icon from "ol/style/Icon";

/**
 * Il est possible d'associer des icons et des labels aux vecteurs.
 * Pour afficher un icon, la classe ol.style.Icon  est caractérisée par de
 * nombreuses options liées notamment à la source, l'ancrage et au style de l'image.
 * @visibleName Les Icônes et les labels
 */

class IconsLabels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: fromLonLat([2.3439, 48.8579]),
      zoom: 10,
    };

    // Data sources and OpenStreetMap layer
    this.osm = new TileLayer({
      source: new OSM(),
    });

    // Point style with an icon
    this.iconStyle = new Style({
      image: new Icon(
        /** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          anchorOrigin: "bottom-left",
          src: "/public/icon.png",
          scale: 0.3,
        })
      ),
    });

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX(),
    });

    // Declaration of the vector layer
    this.vecteurGPX2 = new VectorLayer({
      source: this.sourceGPX,
      style: this.iconStyle,
    });

    // Declare the map
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.vecteurGPX2],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
    });
  }

  componentDidMount() {
    this.olmap.setTarget("map14");
  }

  render() {
    return <div id="map14" style={{ width: "100%", height: "360px" }} />;
  }
}

export default IconsLabels;
