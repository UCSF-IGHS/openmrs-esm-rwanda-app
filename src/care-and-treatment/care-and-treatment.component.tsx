import React from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@carbon/react";
import styles from "../common.scss";
import { useTranslation } from "react-i18next";
import TabOne from "./tabs/tab-one.component";
import TabThree from "./tabs/tab-three.component";
import TabTwo from "./tabs/tab-two.component";

interface OverviewListProps {
  patientUuid: string;
}

const CareAndTreatment: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t("tabOne", "Tab One")}</Tab>
          <Tab>{t("tabTwo", "Tab Two")}</Tab>
          <Tab>{t("tabThree", "Tab Three")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabOne patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <TabTwo patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <TabThree patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CareAndTreatment;
