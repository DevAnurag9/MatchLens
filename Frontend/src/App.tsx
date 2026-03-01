import type { ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import UploadScreen from "./screens/UploadScreen.tsx";
import AnalyzingScreen from "./screens/AnalyzingScreen.tsx";
import ResultsScreen from "./screens/ResultsScreen.tsx";

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <UploadScreen />
            </PageTransition>
          }
        />
        <Route
          path="/analyzing"
          element={
            <PageTransition>
              <AnalyzingScreen />
            </PageTransition>
          }
        />
        <Route
          path="/results"
          element={
            <PageTransition>
              <ResultsScreen />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;