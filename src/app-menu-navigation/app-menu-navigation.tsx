import { ConfigurableLink } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";
import { versionTwoPath } from "../constants";

const VersionTwoNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <ConfigurableLink to={versionTwoPath}>
      {t("rwandaEmr2", "Rwanda EMR 2.X")}
    </ConfigurableLink>
  );
};

export default VersionTwoNavigationButton;
