import React from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@carbon/react";
import styles from "../common.scss";
import { useTranslation } from "react-i18next";
import TabThree from "./tabs/tab-three.component";
import TabTwo from "./tabs/tab-two.component";
import CtAdultVisitForm from "./tabs/ct-adult-visit-form.component";
import CtAdultProblemsForm from "./tabs/ct-adult-problems-form";
import CtAdultOiForm from "./tabs/ct-adult-oi-form";
import CtAdultLabForm from "./tabs/ct-adult-lab-form";
import CtAdultImagingForm from "./tabs/ct-adult-imaging-form";
import CtAdultHospitalizationForm from "./tabs/ct-adult-hospitalization-form";
import CtAdultAllergyForm from "./tabs/ct-adult-allergy-form";

interface OverviewListProps {
  patientUuid: string;
}

const CareAndTreatment: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t("tabOne", "Visits")}</Tab>
          <Tab>{t("tabTwo", "Problems (Wahala)")}</Tab>
          <Tab>{t("tabThree", "OI Form")}</Tab>
          <Tab className="tab-12rem">{t("tabOne", "Lab")}</Tab>
          <Tab>{t("tabTwo", "Imaging")}</Tab>
          <Tab>{t("tabThree", "Hospitalizations")}</Tab>
          <Tab>{t("tabThree", "Allergies")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CtAdultVisitForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultProblemsForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultOiForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultLabForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultImagingForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultHospitalizationForm patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CtAdultAllergyForm patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CareAndTreatment;
