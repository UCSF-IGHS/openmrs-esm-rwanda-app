import { Tile } from "@carbon/react";
import React from "react";
import { useTranslation } from "react-i18next";
// import {
//   EmptyStateComingSoon,
//   PatientChartProps,
// } from "@ohri/openmrs-esm-ohri-commons-lib";

const TabThree: React.FC<{
  patientUuid: string;
}> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t("tabThree", "Tab Three");

  // return <EmptyStateComingSoon headerTitle={"Tab Three"} />;
  return <Tile> Tab Three </Tile>;
};

export default TabThree;
