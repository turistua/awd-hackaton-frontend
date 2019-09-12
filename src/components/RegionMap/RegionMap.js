import React from 'react';
import styles from './RegionMap.module.css';
import mapLink from 'img/worldmap-blank.svg';
import GoogleMapWithAMarker from 'components/GoogleMap/GoogleMapWithMarker';

const regions = [
    {
        name: 'Amazon',
        desc: 'Produces 25% of world\'s oxygen. Region is suffering from massive fire',
        trees: '10 547',
    },
    {
        name: 'Siberia',
        desc: 'Produces 25% of world\'s oxygen. Region is suffering from massive fire',
        trees: '2 784',
    },
    {
        name: 'Colombia',
        desc: 'Produces 25% of world\'s oxygen. Region is suffering from massive fire',
        trees: '541',
    },
    {
        name: 'China',
        desc: 'Produces 25% of world\'s oxygen. Region is suffering from massive fire',
        trees: '1 124',
    },
];

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

    handleMarkerClick = (message, lang, lat, regionId) => {
        this.setState({
            infoboxMessage: message,
            isInfoboxVisible: !this.state.isInfoboxVisible,
            markerLang: -25,
            markerLang: -30,
            markerLat: lat,
            regionId
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
            <div>
                <div className={styles.mapBlock} style={{ width: '100%', height: '400px' }}>
                    <GoogleMapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDumWdHunT8gi1yt7mWG44ZpH0X3Rrz9sY"
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
                        plantTree={(amountTrees, email, regionId) => this.props.apiService.plantTree(amountTrees, this.props.user.email, regionId).then((response) => {
                            console.log('planted', response);
                        })}
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
                                                <div className={styles['region-name']}>{region.name}</div>
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
