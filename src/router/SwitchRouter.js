import PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const NotFound = lazy(() => import('views/NotFound'));
const HomeContainer = lazy(() => import('modules/admin/home/Home'));
const RegisterContainer = lazy(() => import('modules/auth/pages/Register'));
const LoginContainer = lazy(() => import('modules/auth/container/LoginContainer'));

function PrivateRoute({ children, user, ...rest }) {
  return <Route {...rest} render={() => (user ? children : <Redirect to={{ pathname: '/login' }} />)} />;
}

function PublicRoute({ children, user, ...rest }) {
  return <Route {...rest} render={() => (!user ? children : <Redirect to={{ pathname: '/' }} />)} />;
}

function SwitchRouter({ user }) {
  return (
    <BrowserRouter className="ssss">
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <PublicRoute exact path={['/login', '/register']} user={user}>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
          </PublicRoute>

          <PrivateRoute exact path={['/']} user={user}>
            <Route path="/" component={HomeContainer} />
          </PrivateRoute>

          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

PrivateRoute.propTypes = {
  user: PropTypes.shape({}),
};

PrivateRoute.defaultProps = {
  user: {},
};

PublicRoute.propTypes = {
  user: PropTypes.shape({}),
};

PublicRoute.defaultProps = {
  user: {},
};

SwitchRouter.propTypes = {
  user: PropTypes.shape({}),
};

SwitchRouter.defaultProps = {
  user: {},
};

export default SwitchRouter;
