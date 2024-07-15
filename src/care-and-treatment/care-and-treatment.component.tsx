import React from "react";
import { useConfig } from "@openmrs/esm-framework";
import styles from "../common.scss";

import careTreatmentConfigWorkflow from "./care-treatment-config.json";
import {
  SummaryCard,
  getSummaryCardProps,
} from "@ohri/openmrs-esm-ohri-commons-lib";

interface OverviewListProps {
  patientUuid: string;
}

const CareAndTreatment: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const cards = careTreatmentConfigWorkflow.cardDefinitions;

  return (
    <div className={styles.tabContainer}>
      {cards.map((cardContent) => (
        <SummaryCard
          key={cardContent.cardId}
          headerTitle={cardContent.cardTitle}
          patientUuid={patientUuid}
          columns={getSummaryCardProps(cardContent, config)}
        />
      ))}
    </div>
  );
};

export default CareAndTreatment;
