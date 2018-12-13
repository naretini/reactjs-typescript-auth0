import * as React from 'react';
import { Link } from 'react-router-dom'


export default class Nav extends React.Component {
  public render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    );
  }
}
