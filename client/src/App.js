import Appbar from './Appbar'
import Home from './Home'
import Generateid from './Generateid'
import Create from './Create';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
      <Appbar></Appbar>
        <div className="content">
          <Switch>
            <Route path='/generate-id'>
              <Generateid></Generateid>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route path='/create'>
              <Create></Create>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
