export const versionTwoPath = `/openmrs/`;
export const createAppointmentPath = `/openmrs/module/mohappointment/addAppointment.form`;
export const findAppointmentPath = `/openmrs/module/mohappointment/findAppointment.form`;
export const pharmacyManagementPath = `/openmrs/module/pharmacymanagement/storequest.form`;
export const primaryCarePath = `/openmrs/module/rwandaprimarycare/homepage.form`;
export const BASE_API_URL = "/ws/rest/v1/mohbilling";
export const CORE_API_URL = "/ws/rest/v1";
export const ENDPOINTS = {
  GLOBAL_BILL: `${BASE_API_URL}/globalBill`,
  INSURANCE_POLICY: `${BASE_API_URL}/insurancepolicy`,
  AFTER_POST_SUBMISSION: `${BASE_API_URL}/afterPostSubmission`,
  PATIENT: `${CORE_API_URL}/patient`,
  SYSTEM_SETTING: `${CORE_API_URL}/systemsetting`,
  OBS: `${CORE_API_URL}/obs`,
};
export const CONFIG = {
  INSURANCE_NUMBER_CONCEPT_SETTING: "registration.insuranceNumberConcept",
};
export const MESSAGES = {
  SUCCESS: {
    BILL_CREATED: "Patient bill has been created successfully",
  },
  ERROR: {
    NO_ENCOUNTER: "No encounter data available",
    NO_PATIENT: "Patient information not available in encounter",
    NO_INSURANCE:
      "Could not find insurance policy number for this patient. Please ensure the patient has an active insurance policy.",
    SUBMISSION_FAILED: "Billing submission failed",
  },
};
