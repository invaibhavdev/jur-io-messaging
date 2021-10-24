import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import { store } from "./app/store";
import "./App.css";
import Contacts from "./components/Contacts";
import NewConversation from "./components/NewConversation";
import Conversations from "./components/Conversations";
import { Provider } from "react-redux";

function App() {
  function Home() {
    return <h2>Home</h2>;
  }

  function Me() {
    return <h2>Select yourself</h2>;
  }

  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/me">Me</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/conversations">Conversations</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/me">
              <Me />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/conversations/new">
              <NewConversation />
            </Route>
            <Route path="/conversations/:id">
              <div>Messages</div>
            </Route>
            <Route path="/conversations">
              <Conversations />
            </Route>
            <Route path="/">Welcome</Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
