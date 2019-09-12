import React, { useState } from "react";

import { markers } from "components/GoogleMap/GoogleMapWithMarker";
import styles from "components/Landing/Landing.module.css";
import backgroundVideoUrl from "video/smoke.mp4";
import "./PlantTree.css";

import pic1 from "img/group-26.svg";
import pic2 from "img/group-27.svg";
import picg1 from "img/e-sdg-goals-icons-individual-rgb-13-tcm-244-520347@2x.png";
import picg2 from "img/e-sdg-goals-icons-individual-rgb-15-tcm-244-520349@2x.png";
import picg3 from "img/e-sdg-goals-icons-individual-rgb-17-tcm-244-520352@2x.png";

const treesToTokens = trees => {
    return trees * 20;
};

const PlantTree = props => {
    const [treeCount, setTreeCount] = useState(0);
    const [code, setCode] = useState();

    const onSubmit = e => {
        e.preventDefault();
        if (treeCount < 1) {
            console.error("Not enough trees", treeCount);
            return;
        }
        if ((props.user || {}).balance < treesToTokens(treesToTokens)) {
            console.error("Insufficient ballance", (props.user || {}).balance);
            return;
        }
        props.apiService.plantTree(
            treeCount,
            (props.user || {}).email,
            props.router.match.params.regionId
        );
    };

    const decrement = () => {
        if (treeCount > 0) {
            setTreeCount(treeCount - 1);
        }
    };

    const increment = () => {
        setTreeCount(treeCount + 1);
    };

    const submitCode = () => {};

    return (
        <div className="plant-tree-container">
            <div className="plant-tree-video">
                <video width="375" height="812" autoPlay="autoplay" loop muted>
                    <source src={backgroundVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="plant-header">
                <div className="nav-back" onClick={() => props.router.history.goBack()}>&lt;Main</div>
                <div className="header-stats">
                    70 TreeTokens • 7 trees
                    <div className="header-avatar"></div>
                </div>
            </div>
            <h1 className="plant-h1">
                {
                    (
                        markers.find(
                            item =>
                                item.id.toString() ===
                                props.router.match.params.regionId.toString()
                        ) || {}
                    ).message
                }
            </h1>
            <div className="plant-intro">Humans have razed some 20 percent of the Amazon rainforest over the last 40 years alone, and an additional 20 percent is at risk of being destroyed — a potentially catastrophic loss that would cause this vital ecosystem to unravel.</div>

            <div className="plant-paginator"></div>

            <div className="plant-wrapper">
                <h2 className="plant-h2">Plant Trees</h2>
                <div className="plant-tokens-amount">You have {(props.user || {}).balance || 0} TreeTokens</div>
                <div className="plant-tokens-dial">
                    <div className="plant-tokens-dial-button" onClick={() => decrement()}>-</div>
                    <div className={(props.user || {}).balance >= treesToTokens(treeCount) ? "plant-tokens-dial-number" : "plant-tokens-dial-number insufficient-tokens"}>{treeCount}</div>
                    <div className="plant-tokens-dial-button" onClick={() => increment()}>+</div>
                </div>
                <div className={(props.user || {}).balance >= treesToTokens(treeCount) ? "plant-tokens-amount" : "plant-tokens-amount insufficient-tokens"}>You need {treesToTokens(treeCount) || 0} TreeTokens</div>
                {(props.user || {}).balance >= treesToTokens(treeCount) ? (
                    <button onClick={e => onSubmit(e)}>
                        Send TreeTokens & Plant
                    </button>
                ) : (
                    <>
                        <input
                            placeholder="Enter your Unilever code here"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                        <button onClick={submitCode}>
                            Send TreeTokens &amp; Plant
                        </button>
                        <div className="plant-donate">
                            Want to participate without Unilever code?<br/>
                            <a href="#">Donate and plant trees</a>
                        </div>
                    </>
                )}

                <div className="plant-hr"></div>
                <h2 className="plant-h21">Contribution to nature</h2>
                <div className="plant-contrib">
                    <div>
                        <img src={pic1} />
                        42 354 100
                        <span>Kg of oxygen will be produced in next 10 years</span>
                    </div>
                    <div>
                        <img src={pic2} />
                        56 329 570
                        <span>Kg of carbon dioxide will be absorbed in next 10 years</span>
                    </div>
                </div>

            </div>
            <div className="plant-support">
                <h3>Unilever supports the following UN Sustainable Development Goals</h3>
                <div className="plant-support-pics">
                    <img src={picg1} />
                    <img src={picg2} />
                    <img src={picg3} />
                </div>
            </div>
            <footer>
                © Unilever 2019
                <div className="footer-links">
                    <a href="https://www.unilevernotices.com/united-kingdom/english/cookie-notice/notice.html">Cookie Policy</a>
                    <a href="https://www.unilevernotices.com/united-kingdom/english/privacy-notice/notice.html">Privacy Policy</a>
                    <a href="https://www.unilever.co.uk/legal.html">Terms and Conditions</a>
                </div>
            </footer>
        </div>
    );
};

export default PlantTree;
