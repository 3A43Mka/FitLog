import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/users" exact>
                    <UsersPage />
                </Route>
                <Route path="/client/:id" exact>
                    <ClientDetailPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}