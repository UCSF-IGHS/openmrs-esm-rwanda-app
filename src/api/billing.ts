import { openmrsFetch } from "@openmrs/esm-framework";
import { ENDPOINTS, CONFIG } from "../constants";

/**
 * Interface for observation identifier
 */
export interface ObsIdentifier {
  uuid: string;
}

/**
 * Interface for the billing submission payload
 */
export interface BillingSubmissionPayload {
  insurancePolicyNumber: string;
  obs: Array<ObsIdentifier>;
}

/**
 * Submit billing information after form submission
 *
 * @param payload - The data to submit
 * @returns Response from the billing endpoint
 */
export async function submitBillingData(payload: BillingSubmissionPayload) {
  return openmrsFetch(ENDPOINTS.AFTER_POST_SUBMISSION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Gets global bills for a patient
 *
 * @param patientUuid - The patient's UUID
 * @returns List of global bills
 */
export async function getGlobalBills(patientUuid: string) {
  const response = await openmrsFetch(
    `${ENDPOINTS.GLOBAL_BILL}?patient=${patientUuid}&v=full`
  );
  return response.data?.results || [];
}

/**
 * Gets insurance policies for a patient
 *
 * @param patientUuid - The patient's UUID
 * @returns List of insurance policies
 */
export async function getInsurancePolicies(patientUuid: string) {
  const response = await openmrsFetch(
    `${ENDPOINTS.INSURANCE_POLICY}?patient=${patientUuid}&v=full`
  );
  return response.data?.results || [];
}

/**
 * Gets the insurance number concept UUID from system settings
 *
 * @returns Insurance number concept UUID
 */
export async function getInsuranceNumberConceptUuid() {
  const response = await openmrsFetch(
    `${ENDPOINTS.SYSTEM_SETTING}?q=${CONFIG.INSURANCE_NUMBER_CONCEPT_SETTING}&v=custom:(value)`
  );
  return response.data?.results?.[0]?.value;
}

/**
 * Gets observations for a patient with a specific concept
 *
 * @param patientUuid - The patient's UUID
 * @param conceptUuid - The concept UUID to filter by
 * @returns List of observations
 */
export async function getPatientObsByConceptUuid(
  patientUuid: string,
  conceptUuid: string
) {
  const response = await openmrsFetch(
    `${ENDPOINTS.OBS}?patient=${patientUuid}&concept=${conceptUuid}&v=custom:(valueText)&limit=1`
  );
  return response.data?.results || [];
}

/**
 * Gets insurance policy number for a patient using multiple strategies
 *
 * @param patientUuid - The patient's UUID
 * @returns The insurance policy number
 */
export async function getInsurancePolicyNumber(
  patientUuid: string
): Promise<string> {
  try {
    const globalBills = await getGlobalBills(patientUuid);

    if (globalBills.length > 0) {
      const openGlobalBill = globalBills.find((bill) => bill.closed === false);
      const globalBill = openGlobalBill || globalBills[0];

      if (globalBill.admission?.insurancePolicy?.insuranceCardNo) {
        return globalBill.admission.insurancePolicy.insuranceCardNo;
      }
    }
  } catch (e) {
    // Silently continue to next method
  }

  try {
    const policies = await getInsurancePolicies(patientUuid);

    if (policies.length > 0) {
      const activePolicy =
        policies.find(
          (policy) =>
            !policy.expired &&
            policy.coverageStartDate <= new Date() &&
            (!policy.expirationDate || policy.expirationDate >= new Date())
        ) || policies[0];

      if (activePolicy?.insuranceCardNo) {
        return activePolicy.insuranceCardNo;
      }
    }
  } catch (e) {
    // Silently continue to next method
  }

  try {
    const insuranceConceptUuid = await getInsuranceNumberConceptUuid();

    if (insuranceConceptUuid) {
      const observations = await getPatientObsByConceptUuid(
        patientUuid,
        insuranceConceptUuid
      );

      if (observations.length > 0 && observations[0].valueText) {
        return observations[0].valueText;
      }
    }
  } catch (e) {
    // Silently continue
  }

  throw new Error("Could not find insurance policy number for this patient");
}
