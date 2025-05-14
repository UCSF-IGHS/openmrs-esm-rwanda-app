import { ConfigurableLink } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { primaryCarePath } from "../constants";

const PrimaryCareNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <a href={primaryCarePath} target="_blank" rel="noopener noreferrer">
      {t("O2PrimaryCare", "O2 PrimaryCare")}
    </a>
  );
};

export default PrimaryCareNavigationButton;
