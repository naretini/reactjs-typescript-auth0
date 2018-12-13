import * as React from 'react';


export default class Callback extends React.Component<any, any> {


    public componentDidMount() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            console.log("Handle Authentication", this.props.auth)
            this.props.auth.handleAuthentication();
        } else {
            throw new Error("Invalid callback URL.");
        }
    }

    public render() {
        return (
            <div>
                Loading....
            </div>
        );
    }
}
