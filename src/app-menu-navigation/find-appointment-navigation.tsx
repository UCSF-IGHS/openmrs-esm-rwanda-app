import React from "react";
import { useTranslation } from "react-i18next";
import { findAppointmentPath } from "../constants";

const FindAppointmentNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <a href={findAppointmentPath} target="_blank" rel="noopener noreferrer">
      {t("findO2Appointment", "Find O2 Appointment")}
    </a>
  );
};

export default FindAppointmentNavigationButton;
