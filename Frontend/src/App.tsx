import { Routes, Route } from "react-router-dom";
import UploadScreen from "./screens/UploadScreen";
import ResultsScreen from "./screens/ResultsScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
    </Routes>
  );
}

export default App;