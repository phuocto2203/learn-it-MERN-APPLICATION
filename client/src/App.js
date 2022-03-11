import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing}></Route>
        <Route
          exact
          path='/login'
          render={(props) => <Auth {...props} authRoute='login' />}
        ></Route>
        <Route
          exact
          path='/register'
          render={(props) => <Auth {...props} authRoute='register' />}
        ></Route>
        <ProtectedRoute
          exact
          path='/dashboard'
          component={Dashboard}
        ></ProtectedRoute>
        <ProtectedRoute exact path='/about' component={About}></ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
