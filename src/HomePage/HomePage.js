import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <MuiThemeProvider>
            <div className="col-md-6 col-md-offset-3">
                <h3>Users dashboard</h3>
               
                <Table>
                <TableHeader displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}>
                <TableRow>
                  <TableHeaderColumn >Name</TableHeaderColumn>
                  <TableHeaderColumn >Age</TableHeaderColumn>
                  <TableHeaderColumn >Gender </TableHeaderColumn>
                  <TableHeaderColumn >Email </TableHeaderColumn>
                  <TableHeaderColumn >Phone </TableHeaderColumn>

                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                            <TableRowColumn >{user.name}</TableRowColumn>
                            <TableRowColumn >{user.age}</TableRowColumn>
                            <TableRowColumn >{user.gender}</TableRowColumn>
                            <TableRowColumn >{user.email}</TableRowColumn>
                            <TableRowColumn >{user.phoneNo}</TableRowColumn>
                                
                            </li>
                        )}
                    </ul>
                }
                </TableBody>
                </Table>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };