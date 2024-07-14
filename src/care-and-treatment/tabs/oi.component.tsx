import React from "react";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";
import { useConfig } from "@openmrs/esm-framework";
import oiConfig from "./oi-config.json";

const OI: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const oiCardColumns = getSummaryCardProps(oiConfig, config);
  const title = t("opportunisticInfections", "Opportunistic Infections");

  return (
    <SummaryCard
      patientUuid={patientUuid}
      headerTitle={title}
      columns={oiCardColumns}
    />
  );
};

export default OI;
