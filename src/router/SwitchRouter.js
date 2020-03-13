import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const NotFound = lazy(() => import('views/NotFound'));
const HomeContainer = lazy(() => import('modules/admin/home/Home'));
const RegisterContainer = lazy(() => import('modules/auth/pages/Register'));
const LoginContainer = lazy(() => import('modules/auth/container/LoginContainer'));

function PrivateRoute({ children, ...rest }) {
  const isLogin = Number(localStorage.getItem('isLogin'));
  return <Route {...rest} render={() => (isLogin ? children : <Redirect to={{ pathname: '/login' }} />)} />;
}

function PublicRoute({ children, ...rest }) {
  const isLogin = Number(localStorage.getItem('isLogin'));
  return <Route {...rest} render={() => (!isLogin ? children : <Redirect to={{ pathname: '/' }} />)} />;
}

function SwitchRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <PublicRoute exact path={['/login', '/register']}>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
          </PublicRoute>

          <PrivateRoute exact path={['/']}>
            <Route path="/" component={HomeContainer} />
          </PrivateRoute>

          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default SwitchRouter;
