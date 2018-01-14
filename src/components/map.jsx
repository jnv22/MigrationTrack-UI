import { Map, Marker, Popup, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import React, { Component } from 'react';
import moment from 'moment';

import styles from '../styles/app.css';

class RenderedMap extends Component {
  render() {
    function randomizecoordinates(coordinate) {
      return Math.round(coordinate * 1000) / 1000 + (Math.random() * 0.001);
    }
    // set to center of USA
    const position = [39.8282, -98.5795];
    function setMarkers(birds) {
      return birds.map((bird) => {
        // eliminate overlap between markers on identical location
        const lat = randomizecoordinates(bird.location.lat);
        const lng = randomizecoordinates(bird.location.lng);
        return (
          <Marker key={bird._id} position={[lat, lng]}>
            <Popup>
              <span>
                <b>Species: </b>{bird.species}<br />
                <b>Quantity: </b>{bird.quantity}<br />
                <b>Time: </b>{moment(bird.ts).format('dddd, MMMM Do YYYY')}<br />
              </span>
            </Popup>
          </Marker>);
      });
    }

    const userBirds = this.props.userBirds || [];
    const allBirds = this.props.birds || [];

    return (
      <Map className={styles.leafletContainer} center={position} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="All Birds" checked>
            <LayerGroup>
              {setMarkers.call(this, allBirds)}
            </LayerGroup>
          </LayersControl.BaseLayer>
          {userBirds.length > 0 ?
            <LayersControl.BaseLayer name="User Birds">
              <LayerGroup>
                {setMarkers.call(this, userBirds)}
              </LayerGroup>
            </LayersControl.BaseLayer> : ''}
        </LayersControl>
      </Map>
    );
  }
}

export default RenderedMap;