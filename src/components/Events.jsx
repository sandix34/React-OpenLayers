// All of the fun here happens in the console.

import React, { Component } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

/**
 * De nombreuses méthodes sont liées à la classe Map et elles peuvent être déclenchées à partir d'actions appelées "Fires".
 * Les plus utilisées sont on(type, listener, opt_this), once(type, listener, opt_this) qui contiennent
 * une fonction afin d'obtenir des informations de la classe "parent".
 * Ces méthodes sont aussi héritées pour d'autres classes comme celles prenant en charge les sources de données.
 *
 * Dans la version actuelle d'OL, on peut classer les déclencheurs des méthodes selon cinq types :
 *
 * ol.events.Event : un évènement quelconque par le fire change.
 *
 * ol.Object.Event : Les évènements liés à un objet de la classe Map.
 *
 * ol.MapBrowserEvent : Les évènements liés au navigateur web (click, dblclick, pointerdrag, pointermove, singleclick).
 *
 * ol.MapEvent : Les évènement liés à la carte (moveend, movestart, postrender).
 *
 * ol.render.Event : Les évènements liés à un rendu du document (postcompose, precompose).
 *
 * L'exemple ci-après montre comment obtenir le niveau de zoom dans la console à la fin du défilement de la carte.
 *
 * Tout le plaisir se passe ici dans la console.
 *
 * @visibleName Méthodes et évènements
 */

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2,
    };

    this.olmap = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom,
      }),
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
    return <div id="map5" style={{ width: "100%", height: "360px" }}></div>;
  }
}

export default Events;
