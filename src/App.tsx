import "./App.css";
import { Main } from "./pages/Main/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create-form"
          element={
            <DndProvider backend={HTML5Backend}>
              <Main />
            </DndProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
