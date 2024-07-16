import React from "react";
import { useTranslation } from "react-i18next";
import { InlineLoading } from "@carbon/react";
import { useConfig } from "@openmrs/esm-framework";
import { ErrorState } from "@openmrs/esm-patient-common-lib";
import { useEncounterObservations } from "./encounters.resource";
import styles from "./encounterObservations.scss";

interface EncounterObservationsProps {
  encounterUuid: string;
}

const EncounterObservations: React.FC<EncounterObservationsProps> = ({
  encounterUuid,
}) => {
  const { t } = useTranslation();
  const { observations, isLoading, error } =
    useEncounterObservations(encounterUuid);

  const { obsConceptUuidsToHide = [] } = useConfig();

  function getAnswerFromDisplay(display: string): string {
    const colonIndex = display.indexOf(":");
    if (colonIndex === -1) {
      return "";
    } else {
      return display.substring(colonIndex + 1).trim();
    }
  }

  if (isLoading) {
    return (
      <InlineLoading
        description={`${t("loadingObs", "Loading Observations")} ...`}
        role="progressbar"
      />
    );
  }

  if (error) {
    return (
      <ErrorState headerTitle={t("encounters", "Encounters")} error={error} />
    );
  }

  if (observations.length === 0) {
    return <p>{t("noObservationsFound", "No observations found")}</p>;
  }

  const filteredObservations = obsConceptUuidsToHide.length
    ? observations?.filter((obs) => {
        return !obsConceptUuidsToHide.includes(obs?.concept?.uuid);
      })
    : observations;

  return (
    <div className={styles.observation}>
      {filteredObservations?.map((obs, index) => {
        if (obs.groupMembers) {
          return (
            <React.Fragment key={index}>
              <span className={styles.parentConcept}>
                {obs.concept.display}
              </span>
              <span />
              {obs.groupMembers.map((member) => (
                <React.Fragment key={index}>
                  <span className={styles.childConcept}>
                    {member.concept.display}
                  </span>
                  <span>{getAnswerFromDisplay(member.display)}</span>
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              <span>{obs.concept.display}</span>
              <span>{getAnswerFromDisplay(obs.display)}</span>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default EncounterObservations;
