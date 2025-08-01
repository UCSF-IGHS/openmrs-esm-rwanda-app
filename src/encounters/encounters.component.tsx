import React, { useState, useMemo } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tile,
  InlineLoading,
  Dropdown,
  OverflowMenu,
  Layer,
  OverflowMenuItem,
} from "@carbon/react";
import {
  useLayoutType,
  isDesktop,
  showSnackbar,
  showModal,
  launchWorkspace,
} from "@openmrs/esm-framework";
import { ErrorState, EmptyState } from "@openmrs/esm-patient-common-lib";

import {
  transformToMappedEncounter,
  useInfiniteEncounters,
  deleteEncounter,
} from "./encounters.resource";
import EncounterObservations from "./encounterObservations";

import styles from "./encounters-table.scss";

interface EncountersTableProps {
  patientUuid: string;
}

export interface HtmlFormEntryForm {
  formUuid: string;
  formName: string;
  formUiResource: string;
  formUiPage: "enterHtmlFormWithSimpleUi" | "enterHtmlFormWithStandardUi";
  formEditUiPage: "editHtmlFormWithSimpleUi" | "editHtmlFormWithStandardUi";
}

const tableHeaders = (t) => [
  {
    id: 1,
    header: t("dateAndTime", "Date & time"),
    key: "encounterDatetime",
  },
  {
    id: 2,
    header: t("encounterType", "Encounter type"),
    key: "encounterType",
  },
  {
    id: 3,
    header: t("form", "Form name"),
    key: "formName",
  },
  {
    id: 4,
    header: t("provider", "Provider"),
    key: "provider",
  },
];

const EncountersTable: React.FC<EncountersTableProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const desktopLayout = isDesktop(useLayoutType());

  const { encounters, error, isLoading, mutate } =
    useInfiniteEncounters(patientUuid);
  const mappedEncounters = encounters?.map(transformToMappedEncounter);

  const encounterTypes = [
    ...new Set(mappedEncounters?.map((encounter) => encounter.encounterType)),
  ]?.sort();

  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    let filtered = mappedEncounters;

    if (filter && filter !== "All") {
      filtered = filtered.filter(
        (encounter) => encounter.encounterType === filter
      );
    }

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter((encounter) =>
        Object.values(encounter).some((value) =>
          String(value).toLowerCase().includes(lowercasedFilter)
        )
      );
    }

    return filtered;
  }, [filter, searchTerm, mappedEncounters]);

  const isTablet = useLayoutType() === "tablet";

  const handleEncounterTypeChange = ({ selectedItem }) =>
    setFilter(selectedItem);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleDeleteEncounter = React.useCallback(
    (encounterUuid: string, encounterTypeName?: string) => {
      const close = showModal("delete-encounter-modal", {
        close: () => close(),
        encounterTypeName: encounterTypeName || "",
        onConfirmation: () => {
          const abortController = new AbortController();
          deleteEncounter(encounterUuid, abortController)
            .then(() => {
              mutate();
              showSnackbar({
                isLowContrast: true,
                title: t("encounterDeleted", "Encounter deleted"),
                subtitle: `Encounter ${t(
                  "successfullyDeleted",
                  "successfully deleted"
                )}`,
                kind: "success",
              });
            })
            .catch(() => {
              showSnackbar({
                isLowContrast: false,
                title: t("error", "Error"),
                subtitle: `Encounter ${t(
                  "failedDeleting",
                  "couldn't be deleted"
                )}`,
                kind: "error",
              });
            });
          close();
        },
      });
    },
    [t, mutate]
  );

  if (isLoading) {
    return (
      <InlineLoading
        description={`${t("loading", "Loading")} ...`}
        role="progressbar"
      />
    );
  }

  if (error) {
    return (
      <ErrorState headerTitle={t("encounters", "Encounters")} error={error} />
    );
  }

  if (!encounters?.length) {
    return (
      <EmptyState
        headerTitle={t("encounters", "Encounters")}
        displayText={t("encounters__lower", "encounters")}
      />
    );
  }

  if (!encounters?.length) {
    return (
      <p className={classNames(styles.bodyLong01, styles.text02)}>
        {t("noEncountersFound", "No encounters found")}
      </p>
    );
  }

  return (
    <DataTable
      headers={tableHeaders(t)}
      rows={filteredRows}
      overflowMenuOnHover={!isTablet}
      size={isTablet ? "lg" : "xs"}
      useZebraStyles={encounters?.length > 1 ? true : false}
    >
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getExpandHeaderProps,
        getTableProps,
        getToolbarProps,
      }) => (
        <>
          <TableContainer className={styles.tableContainer}>
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <div className={styles.filterContainer}>
                  <Dropdown
                    id="serviceFilter"
                    initialSelectedItem={t("all", "All")}
                    label=""
                    titleText={
                      t("filterByEncounterType", "Filter by encounter type") +
                      ":"
                    }
                    type="inline"
                    items={[t("all", "All"), ...encounterTypes]}
                    onChange={handleEncounterTypeChange}
                    size={desktopLayout ? "sm" : "lg"}
                  />
                </div>
                <TableToolbarSearch
                  className={styles.search}
                  expanded
                  onChange={handleSearch}
                  placeholder={t("searchThisList", "Search this list")}
                  size={isTablet ? "lg" : "sm"}
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableExpandHeader enableToggle {...getExpandHeaderProps()} />
                  {headers.map((header, i) => (
                    <TableHeader
                      className={
                        header.key === "encounterDatetime"
                          ? styles.fixedColumn
                          : ""
                      }
                      key={i}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                  <TableHeader />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  const selectedEncounter = filteredRows.find(
                    (encounter) => encounter.uuid === row.id
                  );
                  return (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}

                        <TableCell className="cds--table-column-menu">
                          <Layer className={styles.layer}>
                            <OverflowMenu
                              data-floating-menu-container
                              aria-label="Encounter table actions menu"
                              size={desktopLayout ? "sm" : "lg"}
                              flipped
                              align="left"
                            >
                              {selectedEncounter?.form && (
                                <OverflowMenuItem
                                  size={desktopLayout ? "sm" : "lg"}
                                  className={styles.menuItem}
                                  itemText={t(
                                    "viewThisEncounter",
                                    "View this encounter"
                                  )}
                                  onClick={() => {
                                    launchWorkspace(
                                      "patient-form-entry-workspace",
                                      {
                                        workspaceTitle:
                                          selectedEncounter.form.display,
                                        formInfo: {
                                          encounterUuid: selectedEncounter.uuid,
                                          formUuid:
                                            "097eb43d-27bd-342a-9057-50fa0d90727d",
                                          patientUuid:
                                            "e430d14b-cf5e-4ea8-96df-bb5cf1d63ba5",
                                          additionalProps: {
                                            mode: "view",
                                          },
                                        },
                                      }
                                    );
                                  }}
                                />
                              )}
                              {selectedEncounter?.form?.uuid && (
                                <OverflowMenuItem
                                  className={styles.menuItem}
                                  itemText={t(
                                    "editThisEncounter",
                                    "Edit this encounter"
                                  )}
                                  size={desktopLayout ? "sm" : "lg"}
                                  onClick={() => {
                                    launchWorkspace(
                                      "patient-form-entry-workspace",
                                      {
                                        workspaceTitle:
                                          selectedEncounter.form.display,
                                        formInfo: {
                                          encounterUuid: selectedEncounter.uuid,
                                          formUuid:
                                            "097eb43d-27bd-342a-9057-50fa0d90727d",
                                          patientUuid:
                                            "e430d14b-cf5e-4ea8-96df-bb5cf1d63ba5",
                                        },
                                      }
                                    );
                                  }}
                                />
                              )}
                              {
                                <OverflowMenuItem
                                  size={desktopLayout ? "sm" : "lg"}
                                  className={styles.menuItem}
                                  itemText={t(
                                    "deleteThisEncounter",
                                    "Delete this encounter"
                                  )}
                                  onClick={() =>
                                    handleDeleteEncounter(
                                      selectedEncounter.uuid,
                                      selectedEncounter.form?.display
                                    )
                                  }
                                  hasDivider
                                  isDelete
                                />
                              }
                            </OverflowMenu>
                          </Layer>
                        </TableCell>
                      </TableExpandRow>
                      {row.isExpanded ? (
                        <TableExpandedRow
                          className={styles.expandedRow}
                          colSpan={headers.length + 2}
                        >
                          <EncounterObservations
                            encounterUuid={selectedEncounter?.uuid}
                          />
                        </TableExpandedRow>
                      ) : (
                        <TableExpandedRow
                          className={styles.hiddenRow}
                          colSpan={headers.length + 2}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {rows.length === 0 ? (
            <div className={styles.tileContainer}>
              <Tile className={styles.tile}>
                <div className={styles.tileContent}>
                  <p className={styles.content}>
                    {t("noEncountersToDisplay", "No encounters to display")}
                  </p>
                  <p className={styles.helper}>
                    {t("checkFilters", "Check the filters above")}
                  </p>
                </div>
              </Tile>
            </div>
          ) : null}
        </>
      )}
    </DataTable>
  );
};

export default EncountersTable;
