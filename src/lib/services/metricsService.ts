import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

// Define the type for a Metric
export interface Metric {
  id?: string; // Firestore-generated ID
  title: string;
  icon: string; // Store icon as a string (optional, as Lucide-react is for UI)
  current: string;
  previous: string;
  change: string;
  isPositive: boolean;
  target: string;
  peak: string;
  average: string;
  timestamp?: Date; // For sorting or historical data
}

// Reference the "metrics" collection
const metricsCollection = collection(db, "metrics");

// Fetch all metrics from Firestore
export const fetchMetrics = async (): Promise<Metric[]> => {
  const querySnapshot = await getDocs(metricsCollection);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      title: data.title,
      icon: data.icon,
      current: data.current,
      previous: data.previous,
      change: data.change,
      isPositive: data.isPositive,
      target: data.target,
      peak: data.peak,
      average: data.average,
      timestamp: data.timestamp ? data.timestamp.toDate() : undefined, // Convert Firestore timestamp to JS Date
    };
  });
};

// Add a new metric to Firestore
export const addMetric = async (
  metric: Omit<Metric, "id">,
): Promise<string> => {
  const docRef = await addDoc(metricsCollection, {
    ...metric,
    timestamp: new Date(), // Set timestamp to now if not provided
  });
  return docRef.id;
};
