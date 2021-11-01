import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import history from "./utils/history";
import "./App.css";
import Contacts from "./components/Contacts";
import NewConversation from "./components/NewConversation";
import Conversations from "./components/Conversations";
import Chat from "./components/Chat";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/conversations/new">
              <NewConversation />
            </Route>
            <Route path="/conversations/:id">
              <Chat />
            </Route>
            <Route path="/conversations">
              <Conversations />
            </Route>
            <Route path="/">
              <Contacts />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
