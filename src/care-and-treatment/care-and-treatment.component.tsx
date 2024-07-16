import React from "react";
import { useConfig } from "@openmrs/esm-framework";

import careTreatmentConfigWorkflow from "./care-treatment-config.json";
import { EncounterListTabsComponent } from "@ohri/openmrs-esm-ohri-commons-lib";

interface OverviewListProps {
  patientUuid: string;
}

const CareAndTreatment: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return (
    <EncounterListTabsComponent
      configSchema={careTreatmentConfigWorkflow}
      config={config}
      patientUuid={patientUuid}
    />
  );
};

export default CareAndTreatment;
