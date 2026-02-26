import { AlgoHeader,ComplexitySection,VideoAndSummary } from "../components/DS_section";
import Array from "../components/Visualization/Array";
export default function BinarySearchPage() {
  return (
    <main className="bg-[var(--yellow-background)]">
      <AlgoHeader />
      <Array/>
      <VideoAndSummary />
      <ComplexitySection />
    </main>
  );
}