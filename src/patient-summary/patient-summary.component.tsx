import { useConfig } from "@openmrs/esm-framework";
import React from "react";
import styles from "../common.scss";
import patientSummaryConfigWorkflow from "./patient-summary-config.json";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";

interface PatientSummaryProps {
  patientUuid: string;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patientUuid }) => {
  const config = useConfig();
  const cards = patientSummaryConfigWorkflow.cardDefinitions;

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

export default PatientSummary;
