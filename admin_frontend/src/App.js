import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from "./Components/pages/Home";
import NavBar from "./Components/layouts/navBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from './Components/pages/User';
import UserList from './Components/pages/UserList';
import EditUser from './Components/pages/EditUser';
import Login from './Components/pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar/> */}
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/UserScreen" component={User}/>
          <Route exact path="/UserList" component={UserList}/>
          <Route exact path="/EditUser/:ID" component={EditUser}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
