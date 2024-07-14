import React from "react";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";
import allergiesCongif from "./allergies-config.json";
import { useConfig } from "@openmrs/esm-framework";

const Allergies: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const allergyCardColumns = getSummaryCardProps(allergiesCongif, config);

  const title = t("allergies", "Allergies");

  return (
    <SummaryCard
      patientUuid={patientUuid}
      headerTitle={title}
      columns={allergyCardColumns}
    />
  );
};

export default Allergies;
