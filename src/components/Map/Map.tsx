import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "../../utils/fix-map-icon";

import 'leaflet/dist/leaflet.css';
import './Map.css';

export const Map = ()=> {
    return (
        <div className="map">
            <MapContainer center={[53.415242,14.5351685]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution= "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
                />
                <Marker position={[53.415242,14.5351685]}>
                    <Popup>
                        <h2>Super miejsce</h2>
                        <p>Najlepsza ośka</p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};