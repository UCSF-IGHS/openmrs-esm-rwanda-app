import React from "react";
import { useTranslation } from "react-i18next";
import { versionTwoPath } from "../constants";

const VersionTwoNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <a href={versionTwoPath} target="_blank" rel="noopener noreferrer">
      {t("rwandaEmr2", "Rwanda EMR 2.X")}
    </a>
  );
};

export default VersionTwoNavigationButton;
