import React, { useState } from "react";

import { regions } from "components/RegionMap/RegionMap";
import landingStyles from "components/Landing/Landing.module.css";
import profileStyles from 'components/Profile/Profile.module.css';
import "./PlantTree.css";
import oxygenImg from 'img/oxygen.svg';
import coImg from 'img/co2.svg';

const treesToTokens = trees => {
    return trees * 20;
};

const PlantTree = props => {
    const [treeCount, setTreeCount] = useState(0);
    const [code, setCode] = useState();
    const [planted, setPlanted] = useState(false);

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
        ).then(data => {
            data && setPlanted(true);
        });
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
        <div>
            <div className="plant-tree-container">
                <button onClick={() => props.router.history.goBack()}>Back</button>
                <div>
                    {
                        (
                            regions.find(
                                item =>
                                    item.id.toString() ===
                                    props.router.match.params.regionId.toString()
                            ) || {}
                        ).message
                    }
                </div>
                <h2>PLANT TREES</h2>
                <h4>You have {(props.user || {}).balance || 0} TreeTokens</h4>
                <div>
                    <span onClick={() => decrement()}>-</span>
                    <span className={(props.user || {}).balance >= treesToTokens(treeCount) ? "" : "insufficient-tokens"}>{treeCount}</span>
                    <span onClick={() => increment()}>+</span>
                </div>
                <div className={(props.user || {}).balance >= treesToTokens(treeCount) ? "" : "insufficient-tokens"}>You need {treesToTokens(treeCount) || 0} TreeTokens</div>
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
                        <p className={landingStyles["step-text"]}>Receive the TreeToken</p>
                        <button className={landingStyles.submit} onClick={submitCode}>
                            Send Code
                        </button>
                        <div className={landingStyles.donate}>
                            <p>Want to participate without Unilever code?</p>
                            <a href="#">Donate and plant trees</a>
                        </div>
                    </>
                )}
            </div>
            {planted ? (<div className={profileStyles.statBlock}>
                <h1>You planted</h1>
                <div className={profileStyles.treesCount}>{treeCount}</div>
                <div className={profileStyles.treesLabel}>Trees</div>
                <div className={profileStyles.separator}></div>
                <div className={profileStyles.facts}>
                    <div>
                        <div className={profileStyles.img}><img src={oxygenImg} alt="oxygen"/></div>
                        <div className={profileStyles.number}>42 354 100</div>
                        <div className={profileStyles.description}>Kg of oxigen will be produced in next 10 years</div>
                    </div>
                    <div>
                        <div className={profileStyles.img}><img src={coImg} alt="co2"/></div>
                        <div className={profileStyles.number}>56 329 570</div>
                        <div className={profileStyles.description}>Kg of carbon dioxide will be absorbed in next 10 years</div>
                    </div>
                </div>
                <div className={profileStyles.shareButton}>Share</div>
            </div>) : null}
        </div>
    );
};

export default PlantTree;
