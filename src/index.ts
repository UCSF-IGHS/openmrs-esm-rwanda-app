import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import {
  createConditionalDashboardLink,
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { createDashboardLink } from "@openmrs/esm-patient-common-lib";

export const moduleName = "@ohri/openmrs-esm-rwanda";

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
}

// clinical views divider
export const clinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink({ title: "Clinical Views", moduleName }),
  options
);

export const careAndTreatmentDashboardLink = getSyncLifecycle(
  createDashboardLink({
    path: "care-and-treatment",
    title: "Care And Treatment",
    moduleName,
  }),
  options
);

export const childCareAndTreatmentDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink({
    path: "child-care-and-treatment",
    title: "Child Care And Treatment",
    patientExpression: "calculateAge(patient.birthDate) < 18",
    moduleName,
  }),
  options
);

export const adultCareAndTreatmentDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink({
    path: "adult-care-and-treatment",
    title: "Adult Care And Treatment",
    patientExpression: "calculateAge(patient.birthDate) >= 18",
    moduleName,
  }),
  options
);

export const careAndTreatmentDashboard = getAsyncLifecycle(
  () => import("./care-and-treatment/care-and-treatment.component"),
  {
    featureName: "care-and-treatment",
    moduleName,
  }
);

export const childCareAndTreatmentDashboard = getAsyncLifecycle(
  () => import("./child-care-and-treatment/child-care-and-treatment.component"),
  {
    featureName: "child-care-and-treatment",
    moduleName,
  }
);
