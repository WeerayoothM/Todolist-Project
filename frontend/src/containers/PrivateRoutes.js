import React from 'react';
import { Route, Switch } from 'react-router-dom';
import permissionList from "../config/roles";
import NotFound from '../pages/NotFound';

function PrivateRoutes(props) {
    const role = props.role || "guest";
    const pageList = permissionList[role];

    return (
        <Switch>
            {pageList.map(page => <Route exact path={page.url} ><page.page setRole={props.setRole} /></Route>)}
            <Route path="*" component={NotFound} />
        </Switch>
    );
}

export default PrivateRoutes;
