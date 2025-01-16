import { type PostSubmissionAction } from "@openmrs/openmrs-form-engine-lib";
import {
  getConfig,
  openmrsFetch,
  type OpenmrsResource,
} from "@openmrs/esm-framework";
import {
  BillingConfig,
  BillingData,
  BillingResponse,
} from "./billing.resource";

const getUuid = (
  resource: string | OpenmrsResource | undefined
): string | undefined => {
  if (!resource) {
    return undefined;
  }
  if (typeof resource === "string") {
    return resource;
  }
  return resource.uuid;
};

const BillingSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    try {
      if (sessionMode !== "enter") {
        console.log("Not a new form submission, skipping billing");
        return;
      }

      console.log("Starting billing submission process");
      const config: BillingConfig = await getConfig(
        "@ohri/openmrs-esm-billing-app"
      );
      const encounter = encounters[0];

      // Extract observations from encounter
      const getObsValue = (conceptUuid: string) => {
        const obs = encounter.obs?.find(
          (observation) => observation.concept.uuid === conceptUuid
        );
        return obs ? obs.value : null;
      };

      // Get values for billing
      const diseaseType = getObsValue(config.concepts.diseaseType);
      const consultationType = getObsValue(config.concepts.consultationType);
      const department = getObsValue(config.concepts.department);
      const isAdmitted = getObsValue(config.concepts.isAdmitted);

      if (!diseaseType || !consultationType || !department) {
        console.error("Missing required billing information");
        return;
      }

      // Prepare billing data
      const billingData: BillingData = {
        patientUuid: patient.id,
        encounterUuid: encounter.uuid,
        diseaseType,
        consultationType,
        department,
        isAdmitted: isAdmitted || false,
        dateCreated: new Date().toISOString(),
        location: getUuid(encounter.location),
        provider: encounter.encounterProviders?.[0]?.provider?.uuid,
      };

      console.log("Billing data prepared:", billingData);
      return true;

      /* TODO: Uncomment when API is ready
      const response = await openmrsFetch<BillingResponse>(config.endpoints.billing, {
        method: 'POST',
        body: billingData
      });
      return response.ok;
      */
    } catch (error) {
      console.error("Error in billing submission:", error);
      return false;
    }
  },
};

export default BillingSubmissionAction;
