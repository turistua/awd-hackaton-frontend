import React from 'react';
import styles from './Landing.module.css';
import { Paginator } from 'components/Paginator/Paginator';
import logoLink from 'img/unilever.png';
import { RegionMap } from 'components/RegionMap/RegionMap';
import { Popup } from 'components/Popup/Popup';
import { Signin } from 'components/Signin/Signin';
import { Signup } from 'components/Signup/Signup';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import backgroundVideoUrl from "video/tree.mp4";
import programme1 from 'img/e-sdg-goals-icons-individual-rgb-13-tcm-244-520347@2x.png';
import programme2 from 'img/e-sdg-goals-icons-individual-rgb-15-tcm-244-520349@2x.png';
import programme3 from 'img/e-sdg-goals-icons-individual-rgb-17-tcm-244-520352@2x.png';
import { Footer } from 'components/Footer/Footer';

const planters = [
    {
        avatar: 'https://i.pravatar.cc/300?img=20',
        name: 'Alexandra',
        trees: 147,
    },
    {
        avatar: 'https://i.pravatar.cc/300?img=51',
        name: 'John',
        trees: 121,
    },
    {
        avatar: 'https://i.pravatar.cc/300?img=58',
        name: 'Michael',
        trees: 119,
    },
];

const INFO_BLOCK_PAGES_TOTAL = 3;

const tokensToTrees = tokens => {
    return tokens * 2;
};

export class Landing extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            infoBlockPage: 0,
            showSuccessCodePopup: false,
            showSignInPopup: false,
            showSignUpPopup: false,
            regionId: '',
            message: '',
            treeCount: 0
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

    tokensRef = React.createRef();
    plantTree = e => {
        e.preventDefault();
        const tokens = this.tokensRef.current.value;
        if (!tokens) {
            console.error("no tokens");
            return;
        }
        this.props.apiService.plantTree(tokensToTrees(tokens), this.props.user.email, this.props.regionId);
    };

    render = () => {
        const {treesPlanted} = this.props.data;
        const {user} = this.props;
        const stepArrow = (<p className={styles['step-arrow']}>↓</p>);
        const navbar = (
            <div className={styles.navbar}>
                <div className={styles.buttons}>
                    <a onClick={() => this.setState({ showSignUpPopup: true })}>Register</a>
                    <a onClick={() => this.setState({ showSignInPopup: true })}>Login</a>
                </div>
            </div>
        );
        const navbarUser = () => (
            <div className={styles.navbarNewWrapper}>
                <div className={styles.navbarNew}>
                    <Link className={styles.button} to="/signout">Signout</Link>
                    <div className={styles.stat}>
                        <span><FontAwesomeIcon icon={faCoins} />{user.balance} Tree Tokens</span>
                        <span> • </span>
                        <span>{user.trees} trees</span>
                    </div>
                    <div className={styles.avatar}>
                        <Link to="/profile"><img src={user.avatarUrl} /></Link>
                    </div>
                </div>
            </div>
        );
        const signInPopup = (
            <Popup onClose={() => this.setState({showSignInPopup: false})}>
                <Signin onSubmit={(email, password) => {
                    this.props.onSignin(email, password)
                    this.setState({
                        showSignInPopup: false,
                        showSignUpPopup: false,
                    });
                }}/>
            </Popup>
        );
        const signUpPopup = (
            <Popup onClose={() => this.setState({showSignUpPopup: false})}>
                <Signup onSubmit={(email, firstName, lastName, password) => {
                    this.props.onSignup(email, firstName, lastName, password)
                    this.setState({
                        showSignInPopup: false,
                        showSignUpPopup: false,
                    });
                }} />
            </Popup>
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
                <div className="successPopup">
                    <h2>Unilever Code</h2>
                    <div className="successPopupWrapper">
                        <div className="hooray">Hooray!</div>
                        <div className="tokensGranted">
                            <div className="tokensAmount">50</div>
                            <div className="tokensLabel">TreeTokens<br/>granted</div>
                        </div>
                        <div className="hr"></div>
                        <button>Let's go planting</button>
                        <div className="submitOneMore">
                            <a href="#">Submit one more code</a>
                        </div>
                        {/* <Link to="/profile">Check your profile</Link> */}
                    </div>
                </div>
            </Popup>
        )
        return (
            <div>
                {user ? navbarUser() : navbar}
                <div className={styles.hero}>

                    <div className={styles.videoBlock}>
                        <video width="1280" height="720" autoPlay="autoplay" loop muted>
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
                            <p className={styles.label}>Trees are already planted</p>
                            <div className={styles.goalMeter}>
                                <div className={styles.current} style={{
                                    width: '20%',
                                }}></div>
                                <span style={{zIndex: 2}}>1st goal: 1 000 000 trees</span>
                            </div>
                            <div className={styles.info}>
                                The loss of trees and other vegetation can cause climate change, desertification, soil erosion, fewer crops, flooding, increased greenhouse gases in the atmosphere, and a host of problems for indigenous people.
                            </div>
                            <div className={styles.separator}></div>
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
                    <RegionMap
                        apiService={this.props.apiService}
                        user={this.props.user}
                        handleMapMarkerClick={(data) => this.setState(data)}
                        router={this.props.router}
                    />
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
                        <li><img src={programme1} alt="Sustainable development goals"/></li>
                        <li><img src={programme2} alt="Sustainable development goals" /></li>
                        <li><img src={programme3} alt="Sustainable development goals" /></li>
                    </ul>
                </div>
                <Footer />
                {this.state.showSuccessCodePopup ? successCodePopup : null}
                {this.state.showSignInPopup ? signInPopup : null}
                {this.state.showSignUpPopup ? signUpPopup : null}
            </div>
        )
    }

}
