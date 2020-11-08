import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { MyClientDetailPage } from './pages/MyClientDetailPage';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';
import {TemplatesPage} from './pages/TemplatesPage';

export const useRoutes = (isAuthenticated, userRole) => {
    if (isAuthenticated && ((userRole === "trainer") || (userRole === "admin"))) {
        return (
            <Switch>
                <Route path="/users" exact>
                    <UsersPage />
                </Route>
                <Route path="/client/:id" exact>
                    <ClientDetailPage />
                </Route>
                <Route path="/templates" exact>
                    <TemplatesPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Redirect to="/profile"/>
            </Switch>
        )
    } else if (isAuthenticated && (userRole === "client")) {
        return (
            <Switch>
                <Route path="/myprofile" exact>
                    <MyClientDetailPage />
                </Route>
                <Redirect to="/myprofile"/>
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