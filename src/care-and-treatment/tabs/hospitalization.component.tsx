import React from "react";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";
import hospitalizationConfig from "./hospitalization-config.json";
import { useConfig } from "@openmrs/esm-framework";

const Hospitalization: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const config = useConfig();
  const allergyCardColumns = getSummaryCardProps(hospitalizationConfig, config);
  const title = t("hospitalization", "Hospitalization");

  return (
    <SummaryCard
      patientUuid={patientUuid}
      headerTitle={title}
      columns={allergyCardColumns}
    />
  );
};

export default Hospitalization;
