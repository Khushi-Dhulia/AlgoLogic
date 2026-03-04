import { AlgoHeader,ComplexitySection,VideoAndSummary } from "../components/DS_section";
import RadixSort from "../components/Visualization/Redix_Sort";
import Array from "../components/Visualization/Array";
import BinaryTree from "../components/Visualization/BinaryTree";
import HashTable from "../components/Visualization/HashTable";
import HeapSort from "../components/Visualization/Heap_Sort";
import SingleLinkedList from "../components/Visualization/Single_Linked_List";
import DoublyLinkedList from "../components/Visualization/Double_linked_List";
import CircularLinkedList from "../components/Visualization/Circular_Linked_List";
import SingleQueue from "../components/Visualization/Single_queue";
import CircularQueue from "../components/Visualization/Circular_queue";
import PriorityQueue from "../components/Visualization/Priority_queue";
import Deque from "../components/Visualization/Deque_queue";
import SetDS from "../components/Visualization/Sets";
import MapDS from "../components/Visualization/Maps";
import Stack from "../components/Visualization/Stack";
import LinearSearch from "../components/Visualization/Linear_Search";
import BinarySearch from "../components/Visualization/Binary_Search";
import BFS from "../components/Visualization/BFS";
import DFS from "../components/Visualization/DFS";
import Dijkstra from "../components/Visualization/Dijkstra";
import MergeSort from "../components/Visualization/Merge_Sort";
import InsertionSort from "../components/Visualization/Insert_Sort";
import QuickSort from "../components/Visualization/Quick_Sort";
import SelectionSort from "../components/Visualization/Selection_Sort";
import BubbleSort from "../components/Visualization/Bubble_Sort";
import BucketSort from "../components/Visualization/Bucket_Sort";
import CountingSort from "../components/Visualization/Counting_Sort";
export default function VisualDSALGO() {
  return (
    <main className="bg-[var(--yellow-background)]">
      <AlgoHeader />
      <Array/><BinaryTree/><HashTable/><SingleLinkedList/><DoublyLinkedList/><CircularLinkedList/>
      <SingleQueue/><CircularQueue/><PriorityQueue/><Deque/><SetDS/><MapDS/><Stack/><LinearSearch/>
      <BinarySearch/><BFS/><DFS/><Dijkstra/><MergeSort/><InsertionSort/><QuickSort/><SelectionSort/><BubbleSort/>
      <BucketSort/><CountingSort/><HeapSort/><RadixSort/>
      <VideoAndSummary />
      <ComplexitySection />
    </main>
  );
}