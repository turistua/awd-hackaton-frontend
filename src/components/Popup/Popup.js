import React from 'react';
import './Popup.css';

export class Popup extends React.PureComponent {

    render = () => {
        return (
            <div className="popup">
                <div
                    className="popup__close"
                    onClick={this.props.onClose}
                    >
                    +
                </div>
                {this.props.children}
            </div>
        )
    }

}
