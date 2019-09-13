import React from "react";
import styles from './Donate.module.css';

export class Donate extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tokens: 0
        };
    }

    decrement = () => {
        if (this.state.tokens > 0) {
            this.setState({ tokens: this.state.tokens - 1 });
        }
    };

    increment = () => {
        this.setState({ tokens: this.state.tokens + 1 });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.tokens) {
            this.props.userService.donate(this.state.tokens);
        }
    }

    render = () => {
        return (
            <form className={styles.donate} autoComplete="off">
                <h2>DONATE</h2>
                <div className={styles.plantTokensPreDial}>How many plants do you want to plant</div>
                <div className={styles.plantTokensDial}>
                    <div className={styles.plantTokensButton} onClick={() => this.decrement()}>-</div>
                    <div className={styles.plantTokensNumber}>{this.state.tokens}</div>
                    <div className={styles.plantTokensButton} onClick={() => this.increment()}>+</div>
                </div>
                <div className={styles.plantTokensPostDial}>20 TreeTokens = 1$</div>
                    <fieldset>
                        <label htmlFor="card">CARD NUMBER</label>
                        <input name="card" placeholder="XXXX-XXXX-XXXX-XXXX" />
                        <div>
                            <div>
                                <label htmlFor="expdate">EXP DATE</label>
                                <input name="expdate" placeholder="MM/YY" />
                            </div>
                            <div>
                                <label htmlFor="pwd">CVC</label>
                                <input name="pwd" type="password" placeholder="XXX" />
                            </div>
                        </div>
                        <div className={styles.hr}></div>
                        <button onClick={e => this.onSubmit(e)}>Buy TreeTokens</button>
                    </fieldset>
            </form>
        );
    };
}
