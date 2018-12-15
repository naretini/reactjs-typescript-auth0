import * as React from 'react';

export interface IProfileState{
    profile :{
        "sub":string,
        "given_name":string,
        "family_name":string,
        "nickname":string,
        "name":string,
        "picture":string,
        "gender":string,
        "locale":string,
        "updated_at":string,
        "email":string,
        "email_verified":boolean,
    },
    error:any,
}


export default class Profile extends React.Component<any,any> {

    public state: IProfileState = {
        profile: null as any,
        error: ""
    }


    public componentDidMount(){
        this.loadUserProfile();
    }


    public render() {
        const {profile, error} =  this.state;
        if(!profile) {
            return null;
        }
        return (
            
            <div>
                <h1>Profile</h1>
                <p>{profile.nickname}</p>
                <img style={{width:'50px', height:'50px'}} src={profile.picture} />
                <pre>{JSON.stringify(profile, null, 2)}</pre>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    private loadUserProfile = () => {
        this.props.auth.getProfile((profile: any, error: any) => {
            this.setState({ profile, error })
        });
    }
}
