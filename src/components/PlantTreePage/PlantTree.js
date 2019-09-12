import React, { useState } from "react";

import { regions } from "components/RegionMap/RegionMap";
import styles from "components/Landing/Landing.module.css";
import "./PlantTree.css";

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
                    <p className={styles["step-text"]}>Receive the TreeToken</p>
                    <button className={styles.submit} onClick={submitCode}>
                        Send Code
                    </button>
                    <div className={styles.donate}>
                        <p>Want to participate without Unilever code?</p>
                        <a href="#">Donate and plant trees</a>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlantTree;
