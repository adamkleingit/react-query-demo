import "./styles.css";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "./sidebar";
import AddNote from "./add-note";
import Note from "./note";
import Notes from "./notes";
import FetchingIndicator from "./fetching-indicator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <NavLink exact className="add-note" to="/add">
            +
          </NavLink>

          <Sidebar />
          {/* <FetchingIndicator /> */}
          <main>
            <Switch>
              <Route exact path="/">
                <Notes />
              </Route>
              <Route exact path="/add">
                <AddNote />
              </Route>
              <Route exact path="/notes/:noteId">
                <Note />
              </Route>
            </Switch>
          </main>
        </div>
        {/* <ReactQueryDevtools  /> */}
      </Router>
    </QueryClientProvider>
  );
}
