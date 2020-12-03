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

/**
 * Un vecteur est défini par les entités géographiques qui le composent.
 * Ces dernières ont une géométrie qui peut être différente les unes des autres
 * dans un même vecteur et des valeurs relatives aux champs attributaires de la donnée.
 * Les géométries sont soit un point, une ligne, un polygone et lorsque plusieurs entités
 * de géométries différentes composent un vecteur, on parle de collection d'objets.
 * OL décompose le vecteur en trois éléments :
 *  - une ou plusieurs entités ol.Feature avec leurs géométries et leurs attributs ;
 *  - une source de données ol.Source.Vector qui prend en charge les entités.
 *    Elle est appelée via un fichier externe ou créée directement dans le script ;
 *  - la couche SIG ol.Layer.Vector  qui charge la source.
 *
 *  Les classes des entités, des sources et des données vectorielles :
 *
 * La classe ol.Feature représentant une entité géographique est caractérisée par plusieurs
 * setters et getters, ainsi il est possible d'obtenir ou d'intégrer plusieurs composantes comme :
 *
 * la géométrie setGeometry(geometry)/getGeometry(geometry),
 *
 * un identifiant unique setId()/getId(),
 *
 * une valeur attributaire d'un champ key set(key)/get(key),
 *
 * un style ou une fonction de style setStyle()/getStyle().
 *
 * En outre, il est possible d'obtenir l'ensemble des champs attributaires par la méthode getKeys() et l'objet
 * de l'entité regroupant la geométrie, les champs et leurs valeurs attributaires :
 * getProperties().
 *
 * Par défaut, le nom du champs de la géométrie est geometry.
 *
 * Création d'entités géographiques :
 *
 * Commençons par la création de géométries indépendantes d'une source de données externes.
 *
 * Les différentes types de géométrie sont définies par la classe ol.geom suivie du type de géométrie :
 *
 * Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection, Circle.
 *
 * Chaque géométrie est composée par un ou des points définis par des coordonnées géographiques X (la longitude)
 * et Y (la latitude).
 *
 * Le code ci-après montre la création d'un point, d'une ligne et d'un polygone.
 * @visibleName Création d'entités géographiques
 */

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
