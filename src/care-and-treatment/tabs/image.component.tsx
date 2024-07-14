import React from "react";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { useTranslation } from "react-i18next";
import imageConfig from "./image-config.json";
import { useConfig } from "@openmrs/esm-framework";

const Image: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const imageCardColumns = getSummaryCardProps(imageConfig, config);
  const title = t("image", "Image");

  return (
    <SummaryCard
      patientUuid={patientUuid}
      headerTitle={title}
      columns={imageCardColumns}
    />
  );
};

export default Image;
