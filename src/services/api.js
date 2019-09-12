export class ApiService {

    constructor(userService) {
        this.userService = userService;
    }

    async getStatistics() {
        // /api/v1/globalstatistic
    }

    async plantTree(amountTrees, email, regionId) {
        return await fetch("http://89.22.50.171/api/v1/planttree", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amountTrees,
                email,
                regionId
            })
        })
            .then((res, rej) => {
                console.log("res", res);
                return res;
            })
            .catch(error => console.log("error", error));
    }

    async getTopGardeners() {
        // /api/v1/topgardeners
    }

    async submitCode(code) {
        if (!this.userService.currentUser) {
            throw Error('Not authorized');
        }
        console.log('submitCode', this.userService.currentUser.email, code);
        return fetch("http://89.22.50.171/api/v1/useraddcheck", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: this.userService.currentUser.email,
                code,
            })
        })
            .then((res, rej) => {
                console.log("Add check response", res);
                return res;
            })
            .catch(error => console.log("error", error));
    }

}
