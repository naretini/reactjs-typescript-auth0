import * as React from 'react';
import './App.css';
import { Route } from 'react-router-dom'


import Home from './Home'
import Profile from './Profile'
import Nav from './Nav'
import Callback from './Callback'
import Auth from './Auth/Auth'

class App extends React.Component<any, any> {

  public auth: Auth;

  public constructor(props: any) {
    super(props)
    this.auth = new Auth(this.props.history)
    console.log(this.auth)
  }

  public render() {
    return (
      <>
        <Nav />
        <div className="body">
          <Route
            path="/"
            exact={true}
            render={props => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => <Callback auth={this.auth} {...props} />}
          />
          <Route path="/profile" component={Profile} />
        </div>
      </>
    );
  }



  // private renderHome(props:any ) {
  //   console.log(this)
  //   return <Home auth={this.auth|| null} {...props} />
  // }


}

export default App;
