/**
 * @file src/types/billing.resource.ts
 * @description Types and interfaces for billing functionality
 */

/**
 * Configuration interface for billing-related concepts and endpoints
 */
export interface BillingConfig {
  concepts: {
    diseaseType: string;
    consultationType: string;
    department: string;
    isAdmitted: string;
  };
  endpoints: {
    billing: string;
  };
}

/**
 * Interface for billing data structure
 */
export interface BillingData {
  patientUuid: string;
  encounterUuid: string;
  diseaseType: string;
  consultationType: string;
  department: string;
  isAdmitted: boolean;
  dateCreated: string;
  location?: string;
  provider?: string;
}

/**
 * Interface for billing API response
 */
export interface BillingResponse {
  uuid: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  billDetails: {
    amount: number;
    items: Array<{
      service: string;
      cost: number;
    }>;
  };
}
