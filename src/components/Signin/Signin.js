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
                <h2>Sign in</h2>
                <fieldset>
                    <label for="email">E-mail</label>
                    <input ref={this.emailRef} name="email" type="email" id="email" placeholder="Enter your E-mail"></input>
                    <label for="password">Password</label>
                    <input ref={this.passwordRef} name="password" id="password" type="password" placeholder="Enter Password"></input>
                    <div className={styles.hr}></div>
                    <button onClick={this.onSubmit}>Sign in</button>
                    <div className={styles.haveaccount}>Don't have account? <a href="#">Sign up</a></div>
                    <div className={styles.or}>or</div>
                    <button className={styles.facebook}>Sign in with Facebook</button>
                </fieldset>
            </form>
        )
    }

}
