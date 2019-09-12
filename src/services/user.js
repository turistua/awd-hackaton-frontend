

export const mockUsers = [
    {
        email: 'test@test.com',
        fullName: 'Mark Stevens',
        badge: 'Starter',
        treesTillLevel: 15,
        tokens: 155,
        avatarUrl: 'https://i.pravatar.cc/300?img=10',
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
            }
        })
            .then((res, rej) => {
                console.log("profile", res);
                return res;
            })
            .catch(error =>
                console.log(
                    `error getting profile data for user ${email}`,
                    error
                )
            );
    }

    register(email, firstName, lastName) {
        fetch("http://89.22.50.171/api/v1/reg", {
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
        fetch(`http://89.22.50.171:8080/api/v1/login?login=${email}`, {
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
            const user = this.getProfile(email);
            this.currentUser = user;
            return user;
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
