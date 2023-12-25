import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ChatPage } from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            fontSize: "1.5rem",
          },
        }}
      ></Toaster>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
