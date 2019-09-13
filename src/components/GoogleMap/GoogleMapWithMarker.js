import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { regions } from "components/RegionMap/RegionMap";

import styles from "./mapStyles.json";
import "./marker.css";

const GoogleMapWithAMarker = withScriptjs(
    withGoogleMap(props => {
        return (
            <GoogleMap
                defaultZoom={props.mapConfig.zoom}
                defaultCenter={props.mapConfig.center}
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: false, // allow scroll wheel
                    styles: styles, // change default map styles
                    restriction: {
                        latLngBounds: props.mapConfig.latLngBounds,
                        strictBounds: true
                    }
                }}
            >
                {regions.map(marker => (
                    <MarkerWithLabel
                        key={marker.lat + " " + marker.lng}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => props.router.history.push(`/plantTree/${marker.id}`)}
                        opacity={0}
                        labelClass="marker-container"
                        labelAnchor={new window.google.maps.Point(0, 0)}
                        labelStyle={{ opacity: 1 }}
                    >
                        <div className="marker">
                            <span
                                className="marker-content"
                                style={{
                                    border: `${marker.radius}px solid`,
                                    borderColor: "rgba(234, 178, 56, .5)",
                                    backgroundColor: "#5ebe5b",
                                    backgroundClip: "padding-box"
                                }}
                            >
                                {props.view === "Home" ? (
                                    <div>+</div>
                                ) : (
                                    <div>
                                        +<div>0</div>
                                    </div>
                                )}
                            </span>
                        </div>
                    </MarkerWithLabel>
                ))}
            </GoogleMap>
        );
    })
);

export default GoogleMapWithAMarker;
