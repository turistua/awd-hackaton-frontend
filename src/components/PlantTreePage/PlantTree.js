import React, { useState } from "react";

import { markers } from "components/GoogleMap/GoogleMapWithMarker";
import "./PlantTree.css";

const treesToTokens = trees => {
    return trees * 20;
};

const PlantTree = props => {
    const [treeCount, setTreeCount] = useState(0);

    const onSubmit = e => {
        e.preventDefault();
        if (treeCount > 0) {
            props.apiService.plantTree(
                treeCount,
                (props.user || {}).email,
                props.router.match.params.regionId
            );
        } else {
            console.error("Not enought trees", treeCount);
        }
    };

    const decrement = () => {
        if (treeCount > 0) {
            setTreeCount(treeCount - 1);
        }
    };

    const increment = () => {
        setTreeCount(treeCount + 1);
    };

    return (
        <div className="plant-tree-container">
            <button onClick={() => props.router.history.goBack()}>Back</button>
            <div>
                {(markers.find(item =>
                                item.id.toString() ===
                                props.router.match.params.regionId.toString()
                        ) || {}
                    ).message
                }
            </div>
            <h2>PLANT TREES</h2>
            <h4>You have {(props.user || {}).balance} TreeTokens</h4>
            <div>
                <span onClick={() => decrement()}>-</span>
                {treeCount}
                <span onClick={() => increment()}>+</span>
            </div>
            <div>You need {treesToTokens(treeCount) || 0} TreeTokens</div>
            <button onClick={e => onSubmit(e)}>Send TreeTokens & Plant</button>
        </div>
    );
};

export default PlantTree;
