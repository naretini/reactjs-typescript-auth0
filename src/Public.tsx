import * as React from 'react';



class Public extends React.Component<any, any>{

    public state = {
        message: ""
    }

    public componentDidMount(){
        fetch('/public').then(response=>{
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


export default Public;