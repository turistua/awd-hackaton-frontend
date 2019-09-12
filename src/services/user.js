

export const mockUsers = [
    {
        email: 'test@test.com',
        firstName: 'Mark',
        lastName: 'Stevens',
        badge: 'Starter',
        treesTillLevel: 15,
        balance: 155,
        avatarUrl: 'https://i.pravatar.cc/300?img=11',
        achievements: [],
        statistic: {},
    }
]

export class UserService {

    currentUser = mockUsers[0];

    async getProfile(email) {
        return await fetch(`http://89.22.50.171:8080/api/v1/getprofile?login=${email}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((res, rej) => {
                // console.log("profile", res);
                return res.json().then(data => data);
            })
            .catch(error =>
                console.log(
                    `error getting profile data for user ${email}`,
                    error
                )
            );
    }

    register(email, firstName, lastName) {
        fetch("http://89.22.50.171:8080/api/v1/reg", {
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
                console.log("res", res);
                return res;
            })
            .catch(error => console.log("error", error));
    }

    async signup(email, firstName, lastName) {
        const registeredUser = this.register(email, firstName, lastName);
        if (registeredUser) {
            this.currentUser = registeredUser;
            return registeredUser;
        }
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
                console.log("res", res);
                return true;
            })
            .catch(error => console.log("error", error));
    }

    async signin(email, password) {
        const isLogin = await this.login(email);
        if (isLogin) {
            const user = await this.getProfile(email);
            const profile = user.profile;
            this.currentUser = {
                email,
                balance: profile.balance,
                fistName: profile.firstName,
                lastName: profile.lastName,
                badge: 'starter',
                treesTillLevel: 15,
                avatarUrl: 'https://i.pravatar.cc/300?img=11',
                achievements: [],
                statistic: {},
            };
            return this.currentUser;
        }
        return null;
    }

    async getStatistic(email) {
        // /api/v1/statistic
    }

    logout() {
        this.currentUser = null;
    }

}
