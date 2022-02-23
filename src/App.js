import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobItem from './components/JobItem'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
