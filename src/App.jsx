import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home"; // Assuming you have a Home component
import Admin from "./components/admin";
import Addform from "./components/addform";
import Editform from "./components/editform";

function App() {
  return (
    <div className="max-w-6xl m-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Default route that redirects to /home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/addform" element={<Addform />} />
          <Route path="/editform/:id" element={<Editform />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
