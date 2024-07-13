import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createOHRIPatientChartSideNavLink } from "@ohri/openmrs-esm-ohri-commons-lib";
import { createDashboardLink } from "@openmrs/esm-patient-common-lib";
import { dashboardMeta } from "./dashboard.meta";
import AllEncounters from "./encounters/encounters.component";

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

export const careAndTreatmentDashboard = getAsyncLifecycle(
  () => import("./care-and-treatment/care-and-treatment.component"),
  {
    featureName: "care-and-treatment",
    moduleName,
  }
);

export const encountersDashboardLink = getSyncLifecycle(
  createDashboardLink({
    ...dashboardMeta,
    moduleName,
  }),
  options
);

export const allEncounters = getSyncLifecycle(AllEncounters, options);
