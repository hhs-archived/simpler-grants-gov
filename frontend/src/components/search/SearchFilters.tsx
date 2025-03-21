import { getAgenciesForFilterOptions } from "src/services/fetch/fetchers/agenciesFetcher";
import { SearchAPIResponse } from "src/types/search/searchResponseTypes";

import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Accordion } from "@trussworks/react-uswds";

import SearchFilterAccordion from "src/components/search/SearchFilterAccordion/SearchFilterAccordion";
import {
  categoryOptions,
  eligibilityOptions,
  fundingOptions,
} from "src/components/search/SearchFilterAccordion/SearchFilterOptions";
import SearchOpportunityStatus from "src/components/search/SearchOpportunityStatus";
import { AgencyFilterAccordion } from "./SearchFilterAccordion/AgencyFilterAccordion";

export function SearchFiltersSkeleton({
  fundingInstrument,
  eligibility,
  agency,
  category,
  opportunityStatus,
}: {
  fundingInstrument: Set<string>;
  eligibility: Set<string>;
  agency: Set<string>;
  category: Set<string>;
  opportunityStatus: Set<string>;
}) {
  console.log("~~ --- render filter skeleton");
  const t = useTranslations("Search");
  return (
    <>
      <SearchOpportunityStatus query={opportunityStatus} />
      <SearchFilterAccordion
        facetCounts={{}}
        filterOptions={fundingOptions}
        query={fundingInstrument}
        queryParamKey="fundingInstrument"
        title={t("accordion.titles.funding")}
      />
      <SearchFilterAccordion
        facetCounts={{}}
        filterOptions={eligibilityOptions}
        query={eligibility}
        queryParamKey={"eligibility"}
        title={t("accordion.titles.eligibility")}
      />
      <SearchFilterAccordion
        facetCounts={{}}
        filterOptions={[]}
        query={agency}
        queryParamKey={"agency"}
        title={t("accordion.titles.agency")}
      />
      <SearchFilterAccordion
        facetCounts={{}}
        filterOptions={categoryOptions}
        query={category}
        queryParamKey={"category"}
        title={t("accordion.titles.category")}
      />
    </>
  );
}

export async function SearchFilters({
  fundingInstrument,
  eligibility,
  agency,
  category,
  opportunityStatus,
  searchResultsPromise,
}: {
  fundingInstrument: Set<string>;
  eligibility: Set<string>;
  agency: Set<string>;
  category: Set<string>;
  opportunityStatus: Set<string>;
  searchResultsPromise: Promise<SearchAPIResponse>;
}) {
  console.log("~~ !!! render filters");
  const t = useTranslations("Search");

  // const [agenciesResults, searchResults] = await Promise.allSettled([
  //   getAgenciesForFilterOptions(),
  //   searchResultsPromise,
  // ]);
  // if (agenciesResults.status === "rejected") {
  // }
  // if (searchResults.status === "rejected") {
  // }

  const agencyOptionsPromise = getAgenciesForFilterOptions();

  let searchResults = {} as SearchAPIResponse;
  try {
    searchResults = await searchResultsPromise;
  } catch (e) {
    // Come back to this to show the user an error
    console.error("Unable to fetch search facet counts", e);
  }

  return (
    <>
      <SearchOpportunityStatus query={opportunityStatus} />
      <SearchFilterAccordion
        facetCounts={searchResults?.facet_counts?.funding_instrument}
        filterOptions={fundingOptions}
        query={fundingInstrument}
        queryParamKey="fundingInstrument"
        title={t("accordion.titles.funding")}
      />
      <SearchFilterAccordion
        facetCounts={searchResults?.facet_counts?.applicant_type}
        filterOptions={eligibilityOptions}
        query={eligibility}
        queryParamKey={"eligibility"}
        title={t("accordion.titles.eligibility")}
      />
      <Suspense
        fallback={
          <Accordion
            bordered={true}
            items={[
              {
                title: t("accordion.titles.agency"),
                content: [],
                expanded: false,
                id: `opportunity-filter-agency-disabled`,
                headingLevel: "h2",
              },
            ]}
            multiselectable={true}
            className="margin-top-4"
          />
        }
      >
        <AgencyFilterAccordion
          searchResultsPromise={searchResultsPromise}
          // facetCounts={searchResults?.facet_counts?.agency}
          query={agency}
          // agencyOptions={agenciesResults}
          agencyOptionsPromise={agencyOptionsPromise}
        />
      </Suspense>
      <SearchFilterAccordion
        facetCounts={searchResults?.facet_counts?.funding_category}
        filterOptions={categoryOptions}
        query={category}
        queryParamKey={"category"}
        title={t("accordion.titles.category")}
      />
    </>
  );
}
