import React from "react";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";
import { useConfig } from "@openmrs/esm-framework";
import visitConfig from "./visit-config.json";

const Visit: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const visitCardColumns = getSummaryCardProps(visitConfig, config);
  const title = t("visit", "Visit");

  return (
    <SummaryCard
      patientUuid={patientUuid}
      headerTitle={title}
      columns={visitCardColumns}
    />
  );
};

export default Visit;
