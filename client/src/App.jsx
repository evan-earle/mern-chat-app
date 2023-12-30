import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ChatPage } from "./pages/ChatPage";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: "1.5rem",
          },
        }}
      ></Toaster>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/chats" element={<ChatPage />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
