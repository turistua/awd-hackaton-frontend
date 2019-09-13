

export const achievements = [
    {
        title: 'First tree',
        img: '',
    },
    {
        title: '15 trees',
        img: '',
    },
    {
        title: '100 trees',
        img: '',
    },
    {
        title: 'Panda saver',
        img: '',
    },
    {
        title: 'Tiger saver',
        img: '',
    },
    {
        title: 'Bear saver',
        img: '',
    },
]

export const mockUsers = [
    {
        email: 'iburyak@gmail.com',
        firstName: 'Igor',
        lastName: 'Buriak',
        badge: 'Starter',
        treesTillLevel: 15,
        balance: 155,
        avatarUrl: 'https://i.pravatar.cc/300?img=11',
        achievements: achievements,
        statistic: {},
        trees: 7,
    }
]

export class UserService {

    currentUser = null;

    async getProfile(email) {
        return await fetch(`http://89.22.50.171:8080/api/v1/getprofile?login=${email}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((res, rej) => {
                return res.json().then(data => data);
            })
            .catch(error =>
                console.log(
                    `error getting profile data for user ${email}`,
                    error
                )
            );
    }

    async register(email, firstName, lastName) {
        return fetch("http://89.22.50.171:8080/api/v1/reg", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName
            })
        })
            .then((res, rej) => {
                console.log("Registration response", res);
                return res.json().then(data => data);
            })
            .catch(error => console.log("error", error));
    }

    async signup(email, firstName, lastName, password) {
        const registeredUser = await this.register(email, firstName, lastName);
        if (registeredUser) {
            this.currentUser = registeredUser;
            const profile = registeredUser.userAccount;
            if (!profile) {
                console.warn('User already exists or server problem');
                return null;
            }
            this.currentUser = {
                email,
                balance: profile.balance,
                firstName: profile.firstName,
                lastName: profile.lastName,
                badge: 'starter',
                treesTillLevel: 15,
                avatarUrl: 'https://i.pravatar.cc/300?img=11',
                achievements: achievements,
                statistic: {},
                trees: 7,
            };
            return this.currentUser;
        }
        console.warn('Server problem on registration');
        return null;
    }

    login(email) {
        return fetch(`http://89.22.50.171:8080/api/v1/login?login=${email}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res, rej) => {
                console.log("Login response", res);
                return true;
            })
            .catch(error => console.log("error", error));
    }

    async signin(email, password) {
        const isLogin = await this.login(email);
        if (isLogin) {
            const user = await this.getProfile(email);
            const profile = user.profile;
            const statistic = await this.getStatistic(email);
            const userStatistic = statistic.userStatistic;
            if (!profile) {
                return null;
            }
            if (!userStatistic) {
                return null;
            }
            this.currentUser = {
                email,
                balance: profile.balance,
                firstName: profile.firstName,
                lastName: profile.lastName,
                badge: 'starter',
                treesTillLevel: 15,
                avatarUrl: 'https://i.pravatar.cc/300?img=11',
                achievements: achievements,
                statistic: {},
                trees: userStatistic.amountOfTrees,
            };
            return this.currentUser;
        }
        return null;
    }

    async getStatistic(email) {
        return fetch(`http://89.22.50.171:8080/api/v1/statistic?login=${email}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res, rej) => {
                return res.json().then(data => data);
            })
            .catch(error => console.log("error", error));
    }

    async donate(amount) {
        return fetch("http://89.22.50.171:8080/api/v1/user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.currentUser.email,
                amount,
            })
        })
            .then((res, rej) => {
                console.log("Donate", res);
                return res;
            })
            .catch(error => console.log("error", error));
    }

    logout() {
        this.currentUser = null;
    }

}
