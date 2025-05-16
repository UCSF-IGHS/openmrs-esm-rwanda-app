import {
  type PostSubmissionAction,
  type OpenmrsEncounter,
} from "@openmrs/esm-form-engine-lib";
import { showSnackbar, showToast } from "@openmrs/esm-framework";
import { submitBillingData, getInsurancePolicyNumber } from "../api/billing";
import { MESSAGES } from "../constants";

function getPatientUuid(encounter: OpenmrsEncounter): string {
  if (!encounter) {
    throw new Error(MESSAGES.ERROR.NO_ENCOUNTER);
  }

  const patient = encounter.patient;

  if (typeof patient === "string") {
    return patient;
  } else if (
    patient &&
    typeof patient === "object" &&
    "uuid" in patient &&
    typeof patient.uuid === "string"
  ) {
    return patient.uuid;
  }

  throw new Error(MESSAGES.ERROR.NO_PATIENT);
}

const BillingSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ encounters, sessionMode }) {
    try {
      if (sessionMode !== "enter") {
        return true;
      }

      const encounter = encounters[0];
      const patientUuid = getPatientUuid(encounter);
      const insurancePolicyNumber = await getInsurancePolicyNumber(patientUuid);

      const payload = {
        insurancePolicyNumber,
        obs: (encounter.obs ?? []).map((ob) => ({
          uuid: ob.uuid,
        })),
      };

      const response = await submitBillingData(payload);

      if (response.ok) {
        showSnackbar({
          title: "Post Submission Action",
          subtitle: MESSAGES.SUCCESS.BILL_CREATED,
          kind: "success",
          timeoutInMs: 4000,
        });
      } else {
        showToast({
          description: `${MESSAGES.ERROR.SUBMISSION_FAILED}: ${
            response.statusText || "Unknown error"
          }`,
          kind: "error",
        });
      }

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      showToast({
        description: errorMessage,
        kind: "error",
      });
      return true;
    }
  },
};

export default BillingSubmissionAction;
