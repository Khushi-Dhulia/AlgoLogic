import { AlgoHeader,ComplexitySection,VideoAndSummary } from "../components/DS_section";
import { BinarySearchVisualizer } from "../components/Visualization/BinarySearchVisualizer";

export default function BinarySearchPage() {
  return (
    <main className="bg-[var(--yellow-background)]">
      <AlgoHeader />
      <BinarySearchVisualizer />
      <VideoAndSummary />
      <ComplexitySection />
    </main>
  );
}