import * as React from 'react';
import { Link } from 'react-router-dom'


export default class Nav extends React.Component<any, any> {
  public render() {
    const {isAuthenticated, login, logout} = this.props.auth;
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/public">Public</Link></li>
          <li>
            <button onClick={isAuthenticated()?logout:login}>
              {isAuthenticated() ? "Log-out": "Log-in"}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
