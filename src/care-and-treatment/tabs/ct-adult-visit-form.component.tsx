import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { moduleName } from "../../index";

const CtAdultVisitForm: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const formName = "A - HIV Visit - Visit Form";
  const title = t("adultCtVisitFormTab", "Visits");
  const encounterTypeUUID = "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0";

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "stageOfPatient",
        header: t("stageOfPatient", "Stage of patient"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3cdc979a-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "currentSTI",
        header: t("currentSTI", "Current STI"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3cd9e9b4-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "stiDiagnosisDescription",
        header: t("stiDiagnosisDescription", "Sti diagnosis"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "56218090-7172-4b34-9c62-c9787e1545a8"
          );
        },
      },
      {
        key: "tbScreeningResult",
        header: t("tbScreeningResult", "TB screening result"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3ce14c2c-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "contraception",
        header: t("econtraceptiondd", "Contraception"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3ccfbd0e-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "nextVisitDate",
        header: t("nextVisitDate", "Next visit date"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3ce94df0-26fe-102b-80cb-0017a47871b2"
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

export default CtAdultVisitForm;
