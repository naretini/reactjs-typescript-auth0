import * as React from 'react';



class Private extends React.Component<any, any>{

    public state = {
        message: ""
    }

    public componentDidMount(){
        console.log(this.props)
        fetch('/private', {
            headers: {Authorization : `Bearer ${this.props.auth.getAccessToken()}`}
        })
        .then(response=>{
            if(response.ok){
                return response.json()
            }
            throw new Error("Network repsonse was not ok")
        })
        .then( response => this.setState({message: response.message}))
        .catch( error => this.setState({message: error.message}))
    }

    public render() {
        return (
            <p>{this.state.message}</p>
        );
    }
}


export default Private;