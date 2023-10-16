import React, {useContext, useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "../../utils/fix-map-icon";

import 'leaflet/dist/leaflet.css';
import './Map.css';
import {SearchContext} from "../../contexts/search.context";
import {SimpleAdEntity} from 'types';
import {SingleAd} from "./SingleAd";

export const Map = ()=> {

    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);


    useEffect(() => {
        (async ()=> {

            const res = await fetch(`http://localhost:3001/ad/search/${search}`);
            const ads = await res.json();
            setAds(ads);

        })();
    }, [search]);

    return (
        <div className="map">
            <MapContainer center={[53.415242,14.5351685]} zoom={15}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution= "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
                />
                {
                    ads.map(ad => (
                        <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                            <Popup>
                                <SingleAd id={ad.id}/>
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>
        </div>
    );
};