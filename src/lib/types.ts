// src/lib/types.ts

/**
 * Interface representing a sustainability metric.
 */
export interface SustainabilityMetric {
  id: string; // Unique identifier for the metric
  energyUsage: number; // Energy usage in kWh
  waterConsumption: number; // Water consumption in cubic meters (m³)
  wasteGenerated: number; // Waste generated in kilograms (kg)
  carbonEmissions: number; // Carbon emissions in kilograms (kg CO₂e)
  timestamp: Date; // Timestamp of when the metric was recorded
  notes: string; // Optional notes for additional context
}

/**
 * Interface representing user authentication status.
 */
export interface AuthUser {
  uid: string; // Firebase user ID
  email: string | null; // User email address
  displayName: string | null; // User display name
  photoURL: string | null; // User profile photo URL
}

/**
 * Generic response interface for API calls.
 */
export interface ApiResponse<T> {
  success: boolean; // Indicates if the API call was successful
  data?: T; // The data returned from the API call
  error?: string; // Error message if the API call failed
}
