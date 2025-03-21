import { SearchAPIResponse } from "src/types/search/searchResponseTypes";

import { useTranslations } from "next-intl";

import SearchFilterAccordion, {
  FilterOption,
} from "src/components/search/SearchFilterAccordion/SearchFilterAccordion";

// functionality differs depending on whether `agencyOptions` or `agencyOptionsPromise` is passed
// with prefetched options we have a synchronous render
// with a Promise we have an async render with Suspense
export async function AgencyFilterAccordion({
  query,
  // agencyOptions,
  agencyOptionsPromise,
  searchResultsPromise,
}: {
  query: Set<string>;
  agencyOptionsPromise: Promise<FilterOption[]>;
  searchResultsPromise: Promise<SearchAPIResponse>;
  // agencyOptions: FilterOption[];
}) {
  console.log("~~ ??? render agencies accordion");
  let facetCounts;
  let agencyOptions: FilterOption[];
  const t = useTranslations("Search");

  const [agencyOptionResults, searchResults] = await Promise.allSettled([
    agencyOptionsPromise,
    searchResultsPromise,
  ]);

  if (agencyOptionResults.status === "rejected") {
    agencyOptions = [];
  } else {
    console.log("~~ ??? render agencies accordion - options resolved");
    agencyOptions = agencyOptionResults.value;
  }
  if (searchResults.status === "rejected") {
    facetCounts = {};
  } else {
    console.log("~~ ??? render agencies accordion - search resolved");
    facetCounts = searchResults.value.facet_counts.agency;
  }
  // let agencyOptions: FilterOption[];
  // try {
  //   agencyOptions = await agencyOptionsPromise;
  // } catch (e) {
  //   // Come back to this to show the user an error
  //   console.error("Unable to fetch agency options for filter list", e);
  //   agencyOptions = [];
  // }
  return (
    <SearchFilterAccordion
      facetCounts={facetCounts}
      filterOptions={agencyOptions}
      query={query}
      queryParamKey={"agency"}
      title={t("accordion.titles.agency")}
    />
  );
}
