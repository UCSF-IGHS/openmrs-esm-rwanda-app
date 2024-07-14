import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import {
  openmrsFetch,
  restBaseUrl,
  type OpenmrsResource,
  formatDatetime,
  parseDate,
} from "@openmrs/esm-framework";

export interface Observation {
  uuid: string;
  concept: {
    uuid: string;
    display: string;
    conceptClass: {
      uuid: string;
      display: string;
    };
  };
  display: string;
  groupMembers: null | Array<{
    uuid: string;
    concept: {
      uuid: string;
      display: string;
    };
    value: {
      uuid: string;
      display: string;
    };
    display: string;
  }>;
  value: unknown;
  obsDatetime?: string;
}

export interface MappedEncounter {
  id: string;
  datetime: string;
  encounterType: string;
  editPrivilege?: string;
  form: OpenmrsResource;
  obs: Array<Observation>;
  provider: string;
  visitUuid: string;
  visitType: string;
  visitTypeUuid?: string;
  visitStartDatetime?: string;
  visitStopDatetime?: string;
}

export interface Observation {
  uuid: string;
  concept: {
    uuid: string;
    display: string;
    conceptClass: {
      uuid: string;
      display: string;
    };
  };
  display: string;
  groupMembers: null | Array<{
    uuid: string;
    concept: {
      uuid: string;
      display: string;
    };
    value: {
      uuid: string;
      display: string;
    };
    display: string;
  }>;
  value: unknown;
  obsDatetime?: string;
}

export function useEncounters(patientUuid: string) {
  const endpointUrl = `${restBaseUrl}/encounter`;
  const params = {
    patient: patientUuid,
    v: "default",
    limit: "100",
  };
  const fullRequest =
    endpointUrl +
    "?" +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { data: { results: Array<Record<string, unknown>> } },
    Error
  >(fullRequest, openmrsFetch);

  return {
    encounters: data ? data?.data?.results : null,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}

export function useInfiniteEncounters(patientUuid: string) {
  const [stopFetching, setStopFetching] = useState(false);
  const getKey = (pageIndex, previousPageData) => {
    const pageSize = 100;

    if (stopFetching) {
      return null; // Stop fetching if the error has occurred
    }

    if (
      previousPageData &&
      !previousPageData?.data?.links.some((link) => link.rel === "next")
    ) {
      return null;
    }

    let url = `${restBaseUrl}/encounter?patient=${patientUuid}&v=default&limit=${pageSize}`;

    if (pageIndex) {
      url += `&startIndex=${pageIndex * pageSize}`;
    }

    return url;
  };

  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(patientUuid ? getKey : null, openmrsFetch, {
      parallel: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  const hasMore = data?.length
    ? !!data[data.length - 1].data?.links?.some((link) => link.rel === "next")
    : false;

  // Automatically fetch more data if there are more pages
  useEffect(() => {
    if (error) {
      setStopFetching(true); // Stop fetching on error
    } else if (hasMore && !isLoading && !isValidating && !stopFetching) {
      setSize(size + 1);
    }
  }, [hasMore, isLoading, isValidating, error, stopFetching, setSize, size]);

  return {
    encounters: data
      ? [].concat(data?.flatMap((page) => page.data.results))
      : null,
    error,
    isLoading,
    isValidating,
    mutate,
    setSize,
    size,
  };
}

export function deleteEncounter(
  encounterUuid: string,
  abortController: AbortController
) {
  return openmrsFetch(`${restBaseUrl}/encounter/${encounterUuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    signal: abortController.signal,
  });
}

export const transformToMappedEncounter = (data) => {
  return {
    ...data,
    id: data.uuid,
    encounterType: data.encounterType?.display ?? "--",
    provider: data.encounterProviders[0]?.display ?? "--",
    formName: data.form?.display ?? "--",
    formUuid: data.form?.uuid,
    encounterDatetime: formatDatetime(parseDate(data?.encounterDatetime)),
    obs: data.obs as Array<Observation>,
    visitUuid: data.visitUuid,
    visitType: data.visitType,
    visitTypeUuid: data.visitTypeUuid,
    visitStartDatetime: data.visitStartDatetime,
    visitStopDatetime: data.visitStopDatetime,
  };
};
