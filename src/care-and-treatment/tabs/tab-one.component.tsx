import { Tile } from "@carbon/react";
import React from "react";
import { useTranslation } from "react-i18next";
// import {
//   EmptyStateComingSoon,
//   EncounterListProps,
//   PatientChartProps,
// } from "@ohri/openmrs-esm-ohri-commons-lib";

const TabOne: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t("tabOne", "Tab One");

  // return <EmptyStateComingSoon headerTitle={"Tab One"} />;
  return <Tile> Tab One </Tile>;
};

export default TabOne;
