import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  createDashboardGroup,
  createDashboardLink,
} from "@openmrs/esm-patient-common-lib";

const moduleName = "@ohri/openmrs-esm-rwanda";

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

// export const clinicalViewsDivider = getSyncLifecycle(
//   createDashboardLink({
//     path: "clinical-views",
//     title: "Clinical Views",
//     moduleName,
//   }),
//   options
// );

export const careAndTreatmentDashboardLink = getSyncLifecycle(
  createDashboardLink({
    path: "care-and-treatment",
    title: "Care And Treatment",
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
