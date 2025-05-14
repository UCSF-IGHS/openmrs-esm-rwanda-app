import React from "react";
import { useTranslation } from "react-i18next";
import { createAppointmentPath } from "../constants";

const CreateAppointmentNavigationButton = () => {
  const { t } = useTranslation();

  return (
    <a href={createAppointmentPath} target="_blank" rel="noopener noreferrer">
      {t("createO2Appointment", "Create O2 Appointment")}
    </a>
  );
};

export default CreateAppointmentNavigationButton;
