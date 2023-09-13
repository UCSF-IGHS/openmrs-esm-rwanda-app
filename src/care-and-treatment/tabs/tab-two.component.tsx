import { Tile } from "@carbon/react";
import React from "react";
import { useTranslation } from "react-i18next";
// import {
//   EmptyStateComingSoon,
//   PatientChartProps,
// } from "@ohri/openmrs-esm-ohri-commons-lib";

const TabTwo: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t("tabTwo", "Tab Two");

  // return <EmptyStateComingSoon headerTitle={"Tab One"} />;
  return <Tile> Tab Two </Tile>;
};

export default TabTwo;
