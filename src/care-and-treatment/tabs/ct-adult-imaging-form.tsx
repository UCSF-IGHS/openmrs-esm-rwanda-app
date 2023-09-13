import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { moduleName } from "../../index";

const CtAdultImagingForm: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const formName = "A - HIV Visit - Problem Form";
  const title = t("adultCtProblemsTab", "Problems");
  const encounterTypeUUID = "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0";

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "chronicCareDiagnosis",
        header: t("chronicCareDiagnosis", "Chronic care diagnosis"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "bb7e04d8-3355-4fe8-9c87-98642eafab93"
          );
        },
      },
      {
        key: "chronicCareDiagnosisNonCoded",
        header: t("chronicCareDiagnosisNonCoded", "Care diagnosis non coded"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "0814d34f-a6ab-408c-848b-c69c96b42f70"
          );
        },
      },
      {
        key: "ctAdultComment",
        header: t("ctAdultComment", "Comments"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3ce888c0-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "emrMatchesPaper",
        header: t("emrMatchesPaper", "EMR matches paper"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "c8f6b4ae-600e-496c-b6b9-d6b395e13a1f"
          );
        },
      },
      {
        key: "actions",
        header: t("actions", "Actions"),
        getValue: (encounter) => [
          {
            form: { name: formName, package: "maternal_health" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: t("viewDetails", "View Details"),
            mode: "view",
          },
          {
            form: { name: formName, package: "maternal_health" },
            encounterUuid: encounter.uuid,
            intent: "*",
            label: t("editForm", "Edit Form"),
            mode: "edit",
          },
        ],
      },
    ],
    []
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypeUUID}
      formList={[
        {
          name: formName,
          fixedIntent: "*",
          excludedIntents: [],
        },
      ]}
      columns={columns}
      description={title}
      headerTitle={title}
      launchOptions={{
        displayText: "Add",
        moduleName: moduleName,
      }}
    />
  );
};

export default CtAdultImagingForm;
