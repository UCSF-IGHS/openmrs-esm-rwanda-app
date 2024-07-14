import { Type } from "@openmrs/esm-framework";

export const configSchema = {
  encounterTypes: {
    _type: Type.Object,
    _description: "Encounter type UUIDs for HIV.",
    _default: {
      allergyEncounterType: "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0",
      visitEncounterType: "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0",
      hospitalizationEncounterType: "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0",
      oiEncounterType: "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0",
      imageEncounterType: "74bf4fe6-8fdb-4228-be39-680a93a9cf6d",
      problemEncounterType: "2dc31190-cf0e-4ab0-a5a1-6ad601d6ecc0",
    },
  },
  obsConcepts: {
    _type: Type.Object,
    _description: "List of observation concept UUIDs related to HIV.",
    _default: {
      suspectedDrugConcept: "3cd95ed6-26fe-102b-80cb-0017a47871b2",
      drugEffectConcept: "3cd96052-26fe-102b-80cb-0017a47871b2",
      actionTakenConcept: "3cdc7e2c-26fe-102b-80cb-0017a47871b2",
      weightConcept: "3ce93b62-26fe-102b-80cb-0017a47871b2",
      tbScreeningConcept: "3ce14c2c-26fe-102b-80cb-0017a47871b2",
      contraceptionConcept: "3ccfbd0e-26fe-102b-80cb-0017a47871b2",
      pregnantConcept: "3ceb4880-26fe-102b-80cb-0017a47871b2",
      nextVisitConcept: "3ce94df0-26fe-102b-80cb-0017a47871b2",
      reasonForHospitalizationConcept: "3ce1492a-26fe-102b-80cb-0017a47871b2",
      durationConcept: "bd7a77ed-32ed-43cd-9719-e3ab09f22457",
      durationUnitConcept: "f1904502-319d-4681-9030-e642111e7ce2",
      chronicCareDxConcept: "0ae23a5a-15f5-102d-96e4-000c29c2a5d7",
      whoStageConcept: "3cdb3b02-26fe-102b-80cb-0017a47871b2",
      criteriaConcept: "3ce6d5fc-26fe-102b-80cb-0017a47871b2",
      imageOrderedConcept: "3cd937e4-26fe-102b-80cb-0017a47871b2",
    },
  },
  formNames: {
    _type: Type.Object,
    _description: "HIV Form Names",
    _default: {
      allergiesFormName: "A - HIV Visit - Allergy Form",
      hospitalizationFormName: "POC Clinical Visit Form v2",
      imageFormName: "A - HIV Visit - Imaging Form",
      oiFormName: "A - HIV Visit - OI Form",
      visitFormName: "A - HIV Visit - Visit Form",
      problemFormName: "A - HIV Visit - Problem Form",
    },
  },
  formUuids: {
    _type: Type.Object,
    _description: "HIV Form Uuids",
    _default: {
      allergiesFormUuid: "097eb43d-27bd-342a-9057-50fa0d90727d",
      hospitalizationFormUuid: "b3abc4ce-c5ac-3c40-b8e7-442b163670f1",
      imageFormUuid: "c0657c47-959b-3062-a88e-e3379ad09ced",
      oiFormUuid: "f5ee42df-8f8b-3f89-98c3-235220ff4dbd",
      visitFormUuid: "221e6a43-7ebd-3d3d-bca0-ffe7a7dcb158",
      problemFormUuid: "3a1f6357-ed3e-3917-bdcc-7af720ac3813",
    },
  },
};

export interface ConfigObject {
  cohorts: object;
  encounterTypes: object;
  obsConcepts: object;
  formNames: object;
  formUuids: object;
}
