import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Favorites from "./components/pages/Favorites";
import Home from './components/pages/Home';
import Operations from "./components/pages/Operations";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-stone-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
