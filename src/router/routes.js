import AuthPage from 'views/layouts/AuthPage';
import HomePage from 'views/layouts/HomePage';
import Login from 'modules/auth/container/LoginContainer';
import Register from 'modules/auth/pages/Register';
import Home from 'modules/home/Home';

const routes = [
  {
    layout: HomePage,
    subRoutes: [
      {
        exact: true,
        name: 'home',
        path: '/',
        component: Home,
      },
    ],
  },
  {
    layout: AuthPage,
    subRoutes: [
      {
        exact: true,
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        exact: true,
        name: 'register',
        path: '/register',
        component: Register,
      },
    ],
  },
];

export default routes;
