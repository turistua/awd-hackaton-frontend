import React from 'react';
import styles from './RegionMap.module.css';
import mapLink from 'img/worldmap-blank.svg';
import GoogleMapWithAMarker from 'components/GoogleMap/GoogleMapWithMarker';

export const regions = [
    {
        id:1,
        name: 'South America',
        desc: 'Humans have razed some 20 percent of the Amazon rainforest over the last 40 years alone, and an additional 20 percent is at risk of being…',
        trees: '37 547',
        lat: 0.063834,
        lng: -71.196064,
        message: "Region name 1",
        radius: 35
    },
    {
        id: 2,
        name: 'South-East Asia',
        desc: 'The region has already lost more than 50 percent of its original forest cover and that some of the primary rainforests in the region will be lost by…',
        trees: '54 784',
        lat: 7.924717,
        lng: 20.436768,
        message: "Region name 2",
        radius: 50
    },
    {
        id: 3,
        name: 'West and Central Africa',
        desc: 'Deforestation rates in southern Africa\'s woodlands are five times higher than prior estimates, according to recent researches. More…',
        trees: '24 587',
        lat: 41.749427,
        lng: 90.304284,
        message: "Region name 3",
        radius: 50
    }
];

const defaultCenter = { lat: 25, lng: 25 };

const defaultZoom = 2;

const defaultConfig = {
    zoom: defaultZoom,
    center: defaultCenter,
    latLngBounds: {
        east: 180,
        north: 68,
        south: -43,
        west: -180
    }
}

const mobileConfig = {
    zoom: 1,
    center: defaultCenter,
    latLngBounds: {
        east: 180,
        north: 180,
        south: -180,
        west: -180
    }
}

export class RegionMap extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            infoboxMessage: '',
            isInfoboxVisible: false,
            markerLang: 0,
            markerLat: 0,
            regionId: '',
        }
    }

    handleMarkerClick = (message, regionId) => {
        this.props.handleMapMarkerClick({
            regionId,
            message,
            treeCount: 0
        })
    }

    handleInfoboxClick = () => {
        this.setState({
          isInfoboxVisible: false
        })
    }

    render() {
        const arrow = <div className={styles.arrow}></div>
        return (
            <div ref={this.props.outerRef}>
                <div className={styles.mapBlock} style={{ width: '100%', height: '400px' }}>
                    <GoogleMapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAwXLb8DusYPwoIgJ6eqrHTUNrpvjaGYUA"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        isInfoboxVisible={this.state.isInfoboxVisible}
                        infoboxMessage={this.state.infoboxMessage}
                        handleInfoboxClick={this.handleInfoboxClick}
                        handleMarkerClick={this.handleMarkerClick}
                        infoboxPosY={this.state.markerLang}
                        infoboxPosX={this.state.markerLat}
                        regionId={this.state.regionId}
                        router={this.props.router}
                        mapConfig={window.innerWidth > 768 ? defaultConfig : mobileConfig}
                        view='Home'
                    />
                </div>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <div>Region</div>
                        <div>Trees planted</div>
                    </div>
                    <div className={styles.body}>
                        {
                            regions.map(region => {
                                return (
                                    <div
                                        key={region.name}
                                        className={styles['region-row']}>
                                        <div>
                                            <div>
                                                <div className={styles['region-name']} onClick={() => this.props.router.history.push(`/plantTree/${region.id}`)}>{region.name}</div>
                                                {arrow}
                                            </div>
                                            <div className={styles['region-desc']}>{region.desc}</div>
                                        </div>
                                        <div>
                                            <div className={styles['region-trees']}>{region.trees}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}
