import { type PostSubmissionAction } from "@openmrs/esm-form-engine-lib";
import { openmrsFetch, showSnackbar, showToast } from "@openmrs/esm-framework";

const BillingSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ encounters, sessionMode }) {
    try {
      if (sessionMode !== "enter") {
        return true;
      }

      const billingEndpoint = "/ws/rest/v1/mohbilling/afterPostSubmission";

      const obsData = {
        obs: encounters[0].obs.map((ob) => ({
          uuid: ob.uuid,
        })),
      };

      const response = await openmrsFetch(billingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obsData),
      });

      if (response.ok) {
        showSnackbar({
          title: "Post Submission Action",
          subtitle: "Patient bill has been created successfully",
          kind: "success",
          timeoutInMs: 4000,
        });
      } else {
        showToast({
          description: `Billing submission failed: ${response.statusText}`,
          kind: "error",
        });
      }

      return true;
    } catch (error) {
      showToast({
        description: `An error occurred during billing submission: ${
          error.message || "Unknown error"
        }`,
        kind: "error",
      });
      return true;
    }
  },
};

export default BillingSubmissionAction;
