import React from "react";
import { useTranslation } from "react-i18next";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const Problem: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const title = t("problem", "Problem");

  return (
    <>
      <EmptyStateComingSoon displayText={title} headerTitle={title} />
    </>
  );
};

export default Problem;
