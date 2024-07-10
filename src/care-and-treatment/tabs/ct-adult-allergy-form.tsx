import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import { moduleName } from "../../index";

const CtAdultAllergyForm: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const { t } = useTranslation();
  const formName = "A - HIV Visit - Allergy Form";
  const title = t("adultCtProblemsTab", "Allergies");
  const encounterTypeUUID = "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0";

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: "adverseEventMedication",
        header: t("adverseEventMedication", "Suspect drug"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3cd95ed6-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "adverseEventMedicationNonCoded",
        header: t("adverseEventMedicationNonCoded", "Suspect drug (Other)"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "2c62cce0-8b88-4b9e-8b22-c99c7ccc3e27"
          );
        },
      },
      {
        key: "adverseEventEffect",
        header: t("adverseEventEffect", "Effect"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3cd96052-26fe-102b-80cb-0017a47871b2"
          );
        },
      },
      {
        key: "adverseEventActionTaken",
        header: t("adverseEventActionTaken", "Action taken"),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            "3cdc7e2c-26fe-102b-80cb-0017a47871b2"
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

export default CtAdultAllergyForm;
