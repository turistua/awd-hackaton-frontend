import React from "react";
import { Popup } from "components/Popup/Popup";
import styles from './Code.module.css';

export class Code extends React.PureComponent {
    codeRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            code: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        const code = this.codeRef.current.value;
        if (!code) {
            console.error("No code");
            return;
        }
        const response = this.props.submitCode(this.state.code);
        console.log('coderesponse', response);
        this.props.setState({
            showSuccessCodePopup: true,
            showSignInPopup: false,
            showSignUpPopup: false,
            showDonatePopup: false,
            showCodePopup: false
        });
    };

    render() {
        return (
            <form className={styles.code}>
            <h2>Unilever Code</h2>
                <fieldset>
                    <input
                        ref={this.codeRef}
                        name="code"
                        input="text"
                        placeholder="X X X X X X X X"
                    />
                    <button onClick={e => this.onSubmit(e)}>
                        Receive TreeTokens
                    </button>
                    <div>
                        Buying Unilever goods in the{" "}
                        <a href="#">following stores you’ll get</a> individual Unilever code. Use it to receive the TreeTokens.
                        Then you can spend TreeTokens to plant trees and fight deforestation.
                    </div>
                </fieldset>
            </form>
        );
    }
}
