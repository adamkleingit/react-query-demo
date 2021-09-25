import "./styles.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "./Sidebar";
import AddNote from "./AddNote";
import Note from "./Note";
import Notes from "./Notes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Sidebar />
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