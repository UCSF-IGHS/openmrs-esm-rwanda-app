import React from "react";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";

const TabThree: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const title = t("tabThree", "Tab Three");

  return (
    <>
      <EmptyStateComingSoon displayText={title} headerTitle={title} />
    </>
  );
};

export default TabThree;
