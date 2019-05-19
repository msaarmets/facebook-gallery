import React from 'react';
import { isLoggedIn } from '../helpers/helpers';
import { Redirect } from 'react-router-dom';
import UserInfoBlock from '../components/userInfo/userInfo';

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
            <UserInfoBlock />
        )
    }
}

export default AlbumsPage;