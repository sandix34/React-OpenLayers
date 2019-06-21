import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// méthode utilitaire pour la projection
import { fromLonLat } from "ol/proj";

// Un élément à afficher sur la carte et associé à un emplacement de carte unique
import Overlay from "ol/Overlay";

/**
 * --------------------------------------------
 *  Les Overlays
 * --------------------------------------------
Les overlays sont des éléments localisés géographiquement comme des images par exemple.
De la même manière que les contrôles,
ils ont ajoutés à l'objet de la classe Map mais ils ne sont pas statiques.
Ainsi, la classe ol.Overlay , en plus de l'indication de son élément dans le conteneur
et de sa position, possède des options liées au panoramique de la carte.
 */

class Overlays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [0, 0],
      zoom: 2
    };

    // Sources de données et couche OpenStreetMap
    this.osm = new TileLayer({
      source: new OSM()
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [this.osm],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
      
    })

    // Déclaration du Marker
    this.marker = new Overlay({
      position: fromLonLat([1.3529599, 44.0221252]),
      positioning: "center-center",
      element: document.getElementById("marker"),
      stopEvent: false
    });
    console.log(this.marker);
    
    // Ajout à l'objet Map
    this.olmap.addOverlay(this.marker);
    console.log(this.olmap);
    
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map15");
    
    
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  render() {
    this.updateMap(); // Update map on render?
    
    return (
      <>
        <div id="map15" style={{ width: "100%", height: "360px" }} />
        <div style={{ display: "none" }}>
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
        </div>
      </>
    );
  }
}

export default Overlays;
