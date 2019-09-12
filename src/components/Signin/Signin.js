import React from 'react';
import styles from './Signin.module.css';

export class Signin extends React.PureComponent {

    emailRef = React.createRef();
    passwordRef = React.createRef();

    onSubmit = (e) => {
        e.preventDefault();
        const email = this.emailRef.current.value;
        const password = this.emailRef.current.value;
        if (!email) {
            console.error('no email');
        }
        if (!password) {
            console.error('no password');
        }
        this.props.onSubmit(email, password);
    }

    render = () => {
        return (
            <form className={styles.signin} autoComplete="off">
                <input ref={this.emailRef} name="email" type="email" placeholder="Type your email..."></input>
                <input ref={this.passwordRef} name="password" type="password" placeholder="Type your password..."></input>
                <button onClick={this.onSubmit}>Signin</button>
            </form>
        )
    }

}
