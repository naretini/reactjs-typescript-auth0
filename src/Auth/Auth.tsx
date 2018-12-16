
import * as auth0 from 'auth0-js'


export default class Auth {

    private userProfile: any;
    private history: any;
    private auth0: any;
    private requestedScopes:string;

    public constructor(history: any) {
        this.history = history;
        this.userProfile = null;
        this.requestedScopes = "openid profile email read:courses";

        this.auth0 = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            responseType: "token id_token",
            scope: this.requestedScopes,
        })

        console.log(this.auth0, this.history)
    }


    public login = () => {
        this.auth0.authorize();
    }


    public logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("id_token")
        localStorage.removeItem("expires_at")
        localStorage.removeItem("scopes")

        this.history.push("/");
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: process.env.REACT_APP_HOME
        })
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

    public userHasScopes(scopes:string[]) {
        const grantedScopes:any = (
            JSON.parse(localStorage.getItem('scopes')as string) || ""
        ).split(" ");

        return scopes.every(scope => grantedScopes.includes(scope))
    }


    public isAuthenticated = (): boolean => {
        const expirestAt = JSON.parse(localStorage.getItem("expires_at") as string)
        return new Date().getTime() < expirestAt;
    }

    public getAccessToken = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error("No access token found");
        }
        return accessToken;
    }

    public getProfile = (cb: any) => {
        if (this.userProfile) {
            return cb(this.userProfile);
        }
        this.auth0.client.userInfo(this.getAccessToken(), (err: any, profile: any) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(profile, err)
        })
    }

    private setSession(authResult: any) {
        // set the time token will expire
        const expireAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        )

        // If there is a value on the `scope` param from the authResult
        // use it to set scopes in the session for the user. Otherwise
        // use the scopes as requested. If no scopes were requested, set it to nothing
        const scopes = authResult.scope || this.requestedScopes || '';

        localStorage.setItem("access_token", authResult.accessToken)
        localStorage.setItem("id_token", authResult.idToken)
        localStorage.setItem("expires_at", expireAt)
        localStorage.setItem("scopes", JSON.stringify(scopes))
    }
}
