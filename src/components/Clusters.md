```jsx
<Clusters />
```

```js static
import React, { Component } from "react";

// classes nécéssaires pour afficher la carte
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// classes pour les vecteurs
import GPX from "ol/format/GPX";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

// Conteneur pour les styles de rendu d'entités vectorielles
import Style from "ol/style/Style";
//Définir le style de trait pour les entités vectorielles
import Stroke from "ol/style/Stroke";
//Définir le style de remplissage pour les entités vectorielles.
import Fill from "ol/style/Fill";
// Définir le style de texte pour les entités vectorielles.
import Text from "ol/style/Text";
//Définir le style de cercle pour les entités vectorielles.
import CircleStyle from "ol/style/Circle";

//Couche source pour regrouper les données vectorielles.
import Cluster from "ol/source/Cluster";

class Clusters extends Component {
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

    // Source de données du vecteur en format GPX
    this.sourceGPX = new VectorSource({
      url: "public/data/capitales.gpx",
      format: new GPX()
    });
    // Source du Cluster
    this.clusterSource = new Cluster({
      distance: 40,
      source: this.sourceGPX
    });
    
    // Déclaration de la couche des clusters
    this.clusters = new VectorLayer({
      source: this.clusterSource,
      // Fonction de style
      style: feature => {
        // Nombre d'Entités dans une classe
        this.nombreEntite = feature.get("features").length;
        if (this.nombreEntite < 5) {
          this.rayon = 10;
          this.contourCouleur = "rgba(0,0,255,1)";
          this.remplissageCouleur = "rgba(0,0,255,0.2)";
        } else if (this.nombreEntite >= 5 && this.nombreEntite < 10) {
          this.rayon = 14;
          this.contourCouleur = "rgba(50,255,100,1)";
          this.remplissageCouleur = "rgba(50,255,100,0.2)";
        } else if (this.nombreEntite >= 10) {
          this.rayon = 16;
          this.contourCouleur = "rgba(255,0,0,1)";
          this.remplissageCouleur = "rgba(255,0,0,0.2)";
        }
        this.style = new Style({
          image: new CircleStyle({
            radius: this.rayon,
            stroke: new Stroke({
              color: this.contourCouleur
            }),
            fill: new Fill({
              color: this.remplissageCouleur
            })
          }),
          text: new Text({
            text: this.nombreEntite.toString(),
            font: "bold 16px Times New Roman",
            fill: new Fill({
              color: this.contourCouleur
            })
          })
        });
        return [this.style];
      }
    });

    // Déclaration de la carte
    this.olmap = new Map({
      target: null,
      layers: [this.osm, this.clusters],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map16");

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
      
        <div id="map16" style={{ width: "100%", height: "360px" }} />
    );
  }
}

export default Clusters;

```