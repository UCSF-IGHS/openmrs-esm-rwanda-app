import React from "react";
import { useTranslation } from "react-i18next";
import { pharmacyManagementPath } from "../constants";

const PharmacyManagementNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <a href={pharmacyManagementPath} target="_blank" rel="noopener noreferrer">
      {t("O2PharmacyManagement", "O2 Pharmacy Management")}
    </a>
  );
};

export default PharmacyManagementNavigationButton;
