export class ApiService {

    constructor(userService) {
        this.userService = userService;
    }

    async getStatistics() {
        return fetch("http://89.22.50.171:8080/api/v1/globalstatistic", {
            method: "GET",
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

    async plantTree(amountTrees, email, regionId) {
        return fetch("http://89.22.50.171:8080/api/v1/planttree", {
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
                console.log("Planting response", res);
                if (res.status < 500) {
                    return res.json().then(data => data);
                }
            })
            .catch(error => console.log("error", error));
    }

    async getTopGardeners() {
        return fetch("http://89.22.50.171:8080/api/v1/topgardeners", {
            method: "GET",
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
