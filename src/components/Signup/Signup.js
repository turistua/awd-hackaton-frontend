import React from 'react';
import styles from './Signup.module.css';

export class Signup extends React.PureComponent {

    emailRef = React.createRef();
    firstNameRef = React.createRef();
    lastNameRef = React.createRef();

    onSubmit = (e) => {
        e.preventDefault();
        const email = this.emailRef.current.value;
        const firstName = this.firstNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        if (!email) {
            console.error('no email');
        }
        if (!firstName) {
            console.error('no first name');
        }
        if (!lastName) {
            console.error('no last name');
        }
        this.props.onSubmit(email, firstName, lastName);
    }

    render() {
        return (
            <form className={styles.signup}>
                <h2>Sign up</h2>
                <fieldset>
                    <label for="email">E-mail</label>
                    <input ref={this.emailRef} type="email" name="email" id="email" placeholder="Your email"></input>
                    <label for="email">First Name</label>
                    <input ref={this.firstNameRef} type="text" name="firstName" id="firstName" placeholder="Your first name"></input>
                    <label for="email">Last Name</label>
                    <input ref={this.lastNameRef} type="text" name="lastName" id="lastName" placeholder="Your last name"></input>
                    <div className={styles.hr}></div>
                    <button onClick={this.onSubmit}>Sign up</button>
                    <div className={styles.haveaccount}>Already have account? <a href="#">Sign in</a></div>
                    <div className={styles.agreeterms}>
                        <input type="checkbox" name="termsAgree" id="termsAgree"></input>
                        <label for="termsAgree"></label>
                        I agree with <a href="#">Terms and conditions</a>
                    </div>
                </fieldset>
            </form>
        )
    }

}
