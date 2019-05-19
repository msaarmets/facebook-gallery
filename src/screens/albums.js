import React from 'react';
import { PrivateRoute, isLoggedIn } from '../helpers/helpers';
import { Redirect } from 'react-router-dom';

class AlbumsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }
    async componentWillMount() {
        if (await isLoggedIn() === false) {
            this.setState({ logged: true })
        }
    }
    render() {
        if (this.state.logged) {
            return <Redirect to="/login/" />
        }
        return (
            <h1>Albums</h1>
        )
    }
}

export default AlbumsPage;