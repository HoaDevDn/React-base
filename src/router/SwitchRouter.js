import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function SwitchRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.name + route.path}
              exact={route.subRoutes ? route.subRoutes.some(r => r.exact) : true}
              path={route.subRoutes ? route.subRoutes.map(r => r.path) : route.path}
            >
              <route.layout>
                {route.subRoutes.map(subRoute => (
                  <Route key={subRoute.name + subRoute.path} {...subRoute} />
                ))}
              </route.layout>
            </Route>
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default SwitchRouter;
