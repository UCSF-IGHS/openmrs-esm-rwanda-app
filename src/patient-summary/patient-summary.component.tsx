import { useConfig } from "@openmrs/esm-framework";
import React from "react";
import styles from "../common.scss";
import patientSummaryConfigWorkflow from "./patient-summary-config.json";
import {
  getSummaryCardProps,
  SummaryCard,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { Tile } from "@carbon/react";
import { CardHeader } from "@openmrs/esm-patient-common-lib";

interface PatientSummaryProps {
  patientUuid: string;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patientUuid }) => {
  const config = useConfig();
  const cards = patientSummaryConfigWorkflow.cardDefinitions;

  return (
    <div className={styles.tabContainer}>
      {cards.map((card) => (
        <Tile key={card.cardId} className={styles.tile}>
          <CardHeader title={card.cardTitle}> </CardHeader>
          <div className={styles.tileBox}>
            {card.columns.map((column) => (
              <div key={column.id} className={styles.tileBoxColumn}>
                <span className={styles.tileTitle}>{column.title}</span>
                <span className={styles.tileValue}>{column.concept}</span>
              </div>
            ))}
          </div>
        </Tile>
      ))}
    </div>
  );
};

export default PatientSummary;
