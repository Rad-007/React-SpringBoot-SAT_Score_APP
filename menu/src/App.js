import "./App.css";
import HamburgerMenu from "./components/HamburgerMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Insert from "./components/Pages/Insert";
import View from "./components/Pages/View";
import Rank from "./components/Pages/Rank";
import Update from "./components/Pages/Update";
import Delete from "./components/Pages/Delete";

function App() {
  return (
    <>
      <Router>
        <HamburgerMenu />

        <div className="pages">
          <Switch>
            <Route exact path="/" component={Insert} />
            <Route path="/view" component={View} />
            <Route path="/rank" component={Rank} />
            <Route path="/update" component={Update} />
            <Route path="/delete" component={Delete} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;


