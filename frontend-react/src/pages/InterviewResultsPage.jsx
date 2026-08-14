import { useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";

// Placeholder -- will call interviewService.getInterview(id) and render the score/category
// breakdown/strengths/weaknesses report described in Phase 5 of the project plan.
export default function InterviewResultsPage() {
  const { id } = useParams();
  return <EmptyState title={`Results for interview #${id}`} description="This page is being built next." />;
}
