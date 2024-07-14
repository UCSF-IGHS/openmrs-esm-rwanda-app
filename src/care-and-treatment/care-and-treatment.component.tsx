import React from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@carbon/react";
import styles from "../common.scss";
import { useTranslation } from "react-i18next";
import Problem from "./tabs/problem.component";
import Visit from "./tabs/visit.component";
import OI from "./tabs/oi.component";
import Allergies from "./tabs/allergies.component";
import Hospitalization from "./tabs/hospitalization.component";
import Image from "./tabs/image.component";

interface OverviewListProps {
  patientUuid: string;
}

const CareAndTreatment: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="visit">{t("visit", "Visit")}</Tab>
          <Tab>{t("problem", "Problem")}</Tab>
          <Tab>{t("oi", "OI")}</Tab>
          <Tab>{t("image", "Image")}</Tab>
          <Tab>{t("allergies", "Allergies")}</Tab>
          <Tab>{t("hospitalization", "Hospitalization")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Visit patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <Problem patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <OI patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <Image patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <Allergies patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <Hospitalization patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CareAndTreatment;
