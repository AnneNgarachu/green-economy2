// src/types/metrics.ts
export interface MetricEntry {
    id: number;
    facility: string;
    metric: string;
    unit: string;
    value: number;
    notes?: string;
    created_at: string;
  }
  
  export interface Metric {
    name: string;
    units: string[];
  }
  
  export interface ManualInputFormProps {
    facilities: string[];
    metrics: Metric[];
  }
  
  export interface FileUploadProps {
    onUploadComplete?: () => void;
  }
  
  export interface RecentEntriesProps {
    entries: MetricEntry[];
    visibleEntries: number;
    onLoadMore: () => void;
  }