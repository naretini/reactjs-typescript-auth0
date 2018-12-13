import * as React from 'react';

export interface IProfileProps {
    render(): void
}

export default class Profile extends React.Component<IProfileProps, any> {
    public render() {
        return (
            <div>
                <h1>Profile</h1>
            </div>
        );
    }
}
