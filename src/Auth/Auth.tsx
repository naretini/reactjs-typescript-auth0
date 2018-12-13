
import * as auth0 from 'auth0-js'


export default class Auth {


    private history: any;
    private auth0: any;

    public constructor(history: any) {
        this.history = history;
        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: "token id_token",
            scope: "openid profile email",
        })

        console.log(this.auth0, this.history)
    }


    public login = () => {
        this.auth0.authorize();
    }


    public handleAuthentication = () => {
        this.auth0.parseHash((err: any, authResult: any) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.history.push("/");
            } else if (err) {
                this.history.push("/");
                console.log(err)
            }
        })
    }


    public isAuthenticated = (): boolean => {
        const expirestAt = JSON.parse(localStorage.getItem("expires_at") as string)
        return new Date().getTime() < expirestAt;
    }


    private setSession(authResult: any) {
        // set the time token will expire
        const expireAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        )

        localStorage.setItem("access_token", authResult.accessToke)
        localStorage.setItem("id_token", authResult.idToken)
        localStorage.setItem("expires_at", expireAt)
    }
}
