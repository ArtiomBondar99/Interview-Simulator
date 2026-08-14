import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import InterviewSetupPage from "./pages/InterviewSetupPage.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import InterviewResultsPage from "./pages/InterviewResultsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import InterviewHistoryPage from "./pages/InterviewHistoryPage.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/setup" element={<InterviewSetupPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/results/:id" element={<InterviewResultsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<InterviewHistoryPage />} />
        </Routes>
      </main>
    </>
  );
}
