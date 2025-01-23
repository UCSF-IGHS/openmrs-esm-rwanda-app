import { defineConfigSchema, getSyncLifecycle } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createOHRIPatientChartSideNavLink } from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  createDashboardGroup,
  createDashboardLink,
} from "@openmrs/esm-patient-common-lib";
import {
  dashboardMeta,
  hivPatientChartMeta,
  hivPatientProgramDashboardMeta,
  hivPatientSummaryDashboardMeta,
} from "./dashboard.meta";
import AllEncounters from "./encounters/encounters.component";
import PatientSummary from "./patient-summary/patient-summary.component";
import CareAndTreatment from "./care-and-treatment/care-and-treatment.component";
import versionTwoNavigationButton from "./app-menu-navigation/app-menu-navigation";
import { registerPostSubmissionAction } from "@openmrs/openmrs-form-engine-lib";

const moduleName = "@ohri/openmrs-esm-rwanda-app";

const options = {
  featureName: "esm-rwanda",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  registerPostSubmissionAction({
    name: "BillingSubmissionAction",
    load: () => import("./post-submission-handlers/billing-submission-action"),
  });
}

// clinical views divider
export const clinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink({ title: "Clinical Views", moduleName }),
  options
);

export const encountersDashboardLink = getSyncLifecycle(
  createDashboardLink({
    ...dashboardMeta,
    moduleName,
  }),
  options
);

export const allEncounters = getSyncLifecycle(AllEncounters, options);

export const hivPatientChartDashboard = getSyncLifecycle(
  createDashboardGroup(hivPatientChartMeta),
  options
);

export const hivPatientSummary = getSyncLifecycle(PatientSummary, options);

export const hivPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...hivPatientSummaryDashboardMeta, moduleName }),
  options
);

export const hivProgramManagementDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...hivPatientProgramDashboardMeta, moduleName }),
  options
);

export const hivProgramManagementSummary = getSyncLifecycle(
  CareAndTreatment,
  options
);

export const versionTwoNavLink = getSyncLifecycle(
  versionTwoNavigationButton,
  options
);
