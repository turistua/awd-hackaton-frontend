import React from 'react';
import styles from './Landing.module.css';
import { Paginator } from 'components/Paginator/Paginator';
import logoLink from 'img/unilever.png';
import { RegionMap } from 'components/RegionMap/RegionMap';
import { Popup } from 'components/Popup/Popup';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import backgroundVideoUrl from "video/tree.mp4";

const planters = [
    {
        avatar: '',
        name: 'Alexandra',
        trees: 147,
    },
    {
        avatar: '',
        name: 'John',
        trees: 14,
    },
    {
        avatar: '',
        name: 'John Smith',
        trees: 10,
    },
];

const INFO_BLOCK_PAGES_TOTAL = 3;

export class Landing extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            infoBlockPage: 0,
            showSuccessCodePopup: false,
        };
    }

    onPageChange = (page) => {
        this.setState({
            infoBlockPage: page,
        })
    }

    submitCode = async () => {
        if (!this.state.code) {
            console.warn('no code to submit');
            return;
        }
        // await this.props.submitCode();
        this.setState({
            showSuccessCodePopup: true,
        });
    }

    render = () => {
        const {treesPlanted} = this.props.data;
        const {user} = this.props;
        const stepArrow = (<p className={styles['step-arrow']}>↓</p>);
        const navbar = (
            <div className={styles.navbar}>
                <div className={styles.buttons}>
                    <Link to="/signup">Register</Link>
                    <Link to="/signin">Login</Link>
                </div>
            </div>
        );
        const navbarUser = () => (
            <div className={styles.navbar}>
                <div className={styles.buttons}>
                    <Link to="/profile">Profile</Link>
                    <Link to="/signout">Signout</Link>
                    <div><FontAwesomeIcon icon={faCoins} />{user.tokens}</div>
                </div>
            </div>
        );
        const codePopup = (
            <Route path="redeem">
                <div style={{
                    position: 'absolute',
                    width: '90vw',
                    height: '90vh',
                }}>
                    Redeem your code
                </div>
            </Route>
        );
        const successCodePopup = (
            <Popup onClose={() => this.setState({showSuccessCodePopup: false})}>
                <h1>Congratulations!</h1>
                <p>Your code is applied successfully</p>
                <Link to="/profile">Check your profile</Link>
            </Popup>
        )
        return (
            <div>
                {user ? navbarUser() : navbar}
                <div className={styles.hero}>

                    <div className={styles.videoBlock}>
                        <video width="1280" height="720" autoplay="autoplay" loop muted>
                            <source src={backgroundVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className={styles.front}>
                        <img className={styles['unilever-logo']} src={logoLink} alt="Unilever logo" />
                        <p className={styles.slogan}>Let’s Fight Deforestation</p>
                        <p className={styles['step-text']}>Get Unilever goods</p>
                        {stepArrow}
                        <input
                            className={styles['code-input']}
                            placeholder="Enter your Unilever code here"
                            value={this.state.code}
                            onChange={e => {this.setState({code: e.target.value})}}
                            />
                        {stepArrow}
                        <p className={styles['step-text']}>Receive the TreeToken</p>
                        {stepArrow}
                        <button
                            className={styles.submit}
                            onClick={this.submitCode}>
                            Plant trees & help Earth
                        </button>
                        <div className={styles.donate}>
                            <p>Want to participate without Unilever code?</p>
                            <a href='#'>Donate and plant trees</a>
                        </div>
                        <div className={styles['info-block']}>
                            <p className={styles['trees-planted']}>{treesPlanted}</p>
                            <p className={styles.label}>Trees planted</p>
                            <div className={styles.filler}></div>
                            <div className={styles.facts}>
                                <div className={styles.fact}>
                                    <p>1 458 754</p>
                                    <p>M3 of oxigen will be produced in next 10 years</p>
                                </div>
                                <div className={styles.fact}>
                                    <p>1 458 754</p>
                                    <p>M3 of oxigen will be produced in next 10 years</p>
                                </div>
                                <div className={styles.fact}>
                                    <p>1 458 754</p>
                                    <p>M3 of oxigen will be produced in next 10 years</p>
                                </div>
                            </div>
                            <Paginator
                                currentPage={this.state.infoBlockPage}
                                totalPages={INFO_BLOCK_PAGES_TOTAL}
                                onPageChange={this.onPageChange}
                                />
                        </div>
                    </div>
                </div>
                <div className={styles['map-container']}>
                    <RegionMap apiService={this.props.apiService} user={this.props.user}/>
                </div>
                <div className={styles.planters}>
                    <p className={styles.heading}>Top tree planters</p>
                    <div className={styles.list}>
                    {
                        planters.map(planter => {
                            return (
                                <div
                                    key={planter.name}
                                    className={styles.info}>
                                    <div
                                        className={styles.avatar}
                                        alt={planter.name + ' avatar'}
                                        style={{
                                            backgroundImage: `url(${planter.avatar})`,
                                        }}>
                                    </div>
                                    <p className={styles.name}>{planter.name}</p>
                                    <p className={styles.trees}>{planter.trees}</p>
                                    <p  className={styles.label}>Trees planted</p>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className={styles.goals}>
                    <p className={styles.heading}>
                        Unilever supports the following UN Sustainable Development Goals
                    </p>
                    <ul className={styles.list}>
                        <li><a></a></li>
                        <li><a></a></li>
                        <li><a></a></li>
                    </ul>
                </div>
                {this.state.showSuccessCodePopup ? successCodePopup : null}
            </div>
        )
    }

}
