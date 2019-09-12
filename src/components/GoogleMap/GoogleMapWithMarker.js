import React, { useState } from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

import styles from "./mapStyles.json";
import "./marker.css";

const markers = [
    {
        id: 1,
        lat: 0.063834,
        lng: -71.196064,
        message: "Region name 1",
        radius: 35
    },
    {
        id: 2,
        lat: 7.924717, 
        lng: 20.436768,
        message: "Region name 2",
        radius: 50
    },
    {
        id: 3,
        lat: 41.749427,
        lng: 90.304284,
        message: "Region name 3",
        radius: 50
    }
];

const defaultCenter = { lat: 25, lng: 25 };

const defaultZoom = 2;

const tokensToTrees = tokens => {
    return tokens * 2;
};

const GoogleMapWithAMarker = withScriptjs(
    withGoogleMap(props => {
        const [treeCount, setTreeCount] = useState(0);
        const tokensRef = React.createRef();
        const plantTree = e => {
            e.preventDefault();
            const tokens = tokensRef.current.value;
            if (!tokens) {
                console.error("no tokens");
                return;
            }
            props.plantTree(tokensToTrees(tokens), props.email, props.regionId);
        };

        return (
            <GoogleMap
                defaultZoom={defaultZoom}
                defaultCenter={defaultCenter}
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: false, // allow scroll wheel
                    styles: styles, // change default map styles
                    restriction: {
                        latLngBounds: {
                            east: 180,
                            north: 68,
                            south: -43,
                            west: -180
                        },
                        strictBounds: true
                    }
                }}
            >
                {markers.map(marker => (
                    <MarkerWithLabel
                        key={marker.lat + " " + marker.lng}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() =>
                            props.handleMarkerClick(
                                marker.message,
                                marker.lat,
                                marker.lng,
                                marker.id
                            )
                        }
                        opacity={0}
                        labelClass="marker-container"
                        labelAnchor={new window.google.maps.Point(0, 0)}
                        labelStyle={{ opacity: 1 }}
                    >
                        <div
                            className="marker"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <span
                                className="marker-content"
                                style={{
                                    border: `${marker.radius}px solid`,
                                    borderColor: 'rgba(234, 178, 56, .5)',
                                    backgroundColor: "#5ebe5b",
                                    backgroundClip: 'padding-box'
                                }}
                            >
                                {props.view === "Home" ? "+" : "0"}
                            </span>
                        </div>
                    </MarkerWithLabel>
                ))}
                {props.isInfoboxVisible && (
                    <InfoWindow
                        position={{
                            lat: props.infoboxPosY,
                            lng: props.infoboxPosX
                        }}
                        onCloseClick={() => props.handleInfoboxClick()}
                    >
                        <div className="plant-tree-container">
                            <h4>{props.infoboxMessage}</h4>
                            <form autoComplete="off">
                                <input
                                    ref={tokensRef}
                                    name="tokens"
                                    type="number"
                                    onChange={e => setTreeCount(tokensToTrees(e.target.value))}
                                    placeholder="Tokens to convert to trees"
                                    min={1}
                                ></input>
                                <span>
                                    You will plant {treeCount} trees
                                </span>
                                <button onClick={plantTree}>Plant</button>
                            </form>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    })
);

export default GoogleMapWithAMarker;
