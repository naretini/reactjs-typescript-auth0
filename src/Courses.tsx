import * as React from 'react';



class Courses extends React.Component<any, any>{

    public state = {
        courses: []
    }

    public componentDidMount(){
        console.log(this.props)
        fetch('/courses', {
            headers: {Authorization : `Bearer ${this.props.auth.getAccessToken()}`}
        })
        .then(response=>{
            if(response.ok){
                return response.json()
            }
            throw new Error("Network repsonse was not ok")
        })
        .then( response => this.setState({courses: response.courses}))
        .catch( error => this.setState({courses: error.message}))
    }

    public render() {
        return (
            <ul>
                {this.state.courses.map((course:any) => {
                    return <li key={course.id}>{course.title}</li>
                })}
            </ul>
        );
    }
}


export default Courses;