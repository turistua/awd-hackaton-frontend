import React from 'react';
import styles from './Signup.module.css';

export class Signup extends React.PureComponent {

    emailRef = React.createRef();
    firstNameRef = React.createRef();
    lastNameRef = React.createRef();
    passwordRef = React.createRef();

    onSubmit = (e) => {
        e.preventDefault();
        const email = this.emailRef.current.value;
        const firstName = this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        const password = this.passwordRef.current.value;
        if (!email) {
            console.error('no email');
        }
        if (!firstName) {
            console.error('no first name');
        }
        if (!lastName) {
            console.error('no last name');
        }
        if (!password) {
            console.error('no password');
        }
        this.props.onSubmit(email, firstName, lastName, password);
    }

    render() {
        return (
            <form className={styles.signup}>
                <input ref={this.emailRef} type="email" name="email" placeholder="Your email"></input>
                <input ref={this.firstNameRef} type="text" name="firstName" placeholder="Your first name"></input>
                <input ref={this.lastNameRef} type="text" name="lastName" placeholder="Your last name"></input>
                <input ref={this.passwordRef} type="password" name="password" placeholder="Your password"></input>
                <button onClick={this.onSubmit}>Signup</button>
            </form>
        )
    }

}
