import { useEffect } from "react";
import { AssessmentFlow } from "./AssessmentFlow";

export default function Assessment() {
  useEffect(() => {
    document.title = "Assessment Kepribadian - Jatimetri";
  }, []);

  return <AssessmentFlow />;
}
