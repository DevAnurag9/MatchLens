import { Routes, Route } from "react-router-dom";
import UploadScreen from "./screens/UploadScreen";
import AnalyzingScreen from "./screens/AnalyzingScreen";
import ResultsScreen from "./screens/ResultsScreen";

function App() {
  return (
    <Routes>
    <Route path="/" element={<UploadScreen />} />
    <Route path="/analyzing" element={<AnalyzingScreen />} />
    <Route path="/results" element={<ResultsScreen />} />
  </Routes>
  );
}

export default App;