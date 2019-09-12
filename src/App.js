import React from 'react';
import './App.css';
import { Landing } from 'components/Landing/Landing';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProfilePage } from 'components/Profile/Profile';
import { Signin } from 'components/Signin/Signin';
import { Signup } from 'components/Signup/Signup';
import { NotFound } from 'components/NotFound/NotFound';
import { UserService, mockUsers } from 'services/user';
import { ApiService } from 'services/api';

class App extends React.PureComponent {

    constructor() {
        super();
        this.userService = new UserService();
        this.apiService = new ApiService(this.userService);
        this.state = {
            user: this.userService.currentUser,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Route path="/" exact render={router => {
                        return (
                            <Landing
                                apiService={this.apiService}
                                userService={this.userService}
                                user={this.userService.currentUser}
                                data={{
                                    treesPlanted: '110 234',
                                }}
                                user={this.state.user}
                                submitCode={async () => {
                                    await this.apiService.submitCode(this.state.code);
                                }}
                                />
                        )
                    }}/>
                    <Route path="/signin" exact render={router => {
                        return (
                            <Signin
                                onSubmit={(email, password) =>
                                    this.userService.signin(email, password)
                                    .then((user) => {
                                        this.setState({user});
                                    })
                                }/>
                        )
                    }}/>
                    <Route path="/signup" exact render={router => {
                        return (
                            <Signup
                                onSubmit={(email, firstName, lastName) =>
                                    this.userService.signup(email, firstName, lastName)
                                        .then(user => {
                                            this.setState({user});
                                        })
                                } />
                        )
                    }}/>
                    <Route path="/profile" exact render={router => {
                        return (
                            <ProfilePage
                                user={this.state.user}
                                />
                        )
                    }}/>
                    <Route path="/donate" exact render={router => {
                        return null;
                    }}/>
                    <Route path="/signout" exact render={router => {
                        this.userService.logout();
                        this.setState({user: null});
                        router.history.push('/');
                    }}/>
                </Router>
            </div>
        );
    }

}

export default App;
