import React from "react";

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
            <div>
                <h2>DONATE</h2>
                <div>Tokens</div>
                <div>
                    <span onClick={() => this.decrement()}>-</span>
                    <span>{this.state.tokens}</span>
                    <span onClick={() => this.increment()}>+</span>
                </div>
                <div>20 TreeTokens = 1$</div>
                <form>
                    <label htmlFor="card">CARD NUMBER</label>
                    <input name="card" placeholder="XXXX-XXXX-XXXX-XXXX" />
                    <label htmlFor="expdate">EXP DATE</label>
                    <input name="expdate" placeholder="MM/YY" />
                    <label htmlFor="pwd">CVC</label>
                    <input name="pwd" type="password" placeholder="XXX" />
                    <button onClick={e => this.onSubmit(e)}>Buy TreeTokens</button>
                </form>
            </div>
        );
    };
}
