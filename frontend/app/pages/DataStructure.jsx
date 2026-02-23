import { AlgoHeader,ComplexitySection,VideoAndSummary } from "../components/DS_section";
import MultiLevelLinkedList from "../components/Visualization/Multilevel_LL"
export default function BinarySearchPage() {
  return (
    <main className="bg-[var(--yellow-background)]">
      <AlgoHeader />
      {/* <BinarySearchVisualizer /> */}
      <MultiLevelLinkedList/>
      <VideoAndSummary />
      <ComplexitySection />
    </main>
  );
}