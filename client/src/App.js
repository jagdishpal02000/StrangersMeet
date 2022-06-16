import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Chat from "./components/chat";
import Join from "./components/join";
import NotFound from "./components/NotFound";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Join />
      </Route>
      <Route path="/chat">
        <Chat location={window.location}/>
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default App;
