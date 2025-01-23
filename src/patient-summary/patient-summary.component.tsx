import React from "react";
import styles from "../common.scss";
import patientSummaryConfigWorkflow from "./patient-summary-config.json";
import { Tile } from "@carbon/react";
import { CardHeader } from "@openmrs/esm-patient-common-lib";

const PatientSummary = () => {
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
