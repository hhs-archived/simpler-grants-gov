import { Metadata } from "next";
import QueryProvider from "src/app/[locale]/search/QueryProvider";
import { environment } from "src/constants/environments";
import withFeatureFlag from "src/hoc/withFeatureFlag";
import { searchForOpportunities } from "src/services/fetch/fetchers/searchFetcher";
import { OptionalStringDict } from "src/types/generalTypes";
import { LocalizedPageProps } from "src/types/intl";
import { Breakpoints } from "src/types/uiTypes";
import { convertSearchParamsToProperTypes } from "src/utils/search/convertSearchParamsToProperTypes";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";

import ContentDisplayToggle from "src/components/ContentDisplayToggle";
import { SaveSearchPanel } from "src/components/search/SaveSearchPanel";
import SearchAnalytics from "src/components/search/SearchAnalytics";
import SearchBar from "src/components/search/SearchBar";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "src/components/search/SearchFilters";
import SearchResults from "src/components/search/SearchResults";

export async function generateMetadata({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const meta: Metadata = {
    title: t("Search.title"),
    description: t("Search.meta_description"),
  };
  return meta;
}
type SearchPageProps = {
  searchParams: Promise<OptionalStringDict>;
  params: Promise<{ locale: string }>;
};

async function Search({ searchParams, params }: SearchPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Search");

  const convertedSearchParams =
    convertSearchParamsToProperTypes(resolvedSearchParams);
  const { agency, category, eligibility, fundingInstrument, query, status } =
    convertedSearchParams;

  if (!("page" in resolvedSearchParams)) {
    resolvedSearchParams.page = "1";
  }

  const searchResultsPromise = searchForOpportunities(convertedSearchParams);

  return (
    <>
      <SearchAnalytics
        params={resolvedSearchParams}
        newRelicEnabled={environment.NEW_RELIC_ENABLED === "true"}
      />
      <QueryProvider>
        <div className="grid-container">
          <div className="search-bar">
            <SearchBar queryTermFromParent={query} />
          </div>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <ContentDisplayToggle
                showCallToAction={t("filterDisplayToggle.showFilters")}
                hideCallToAction={t("filterDisplayToggle.hideFilters")}
                breakpoint={Breakpoints.TABLET}
                type="centered"
              >
                <SaveSearchPanel />
                {/* <Suspense
                  fallback={<div>non-interactive-fallback</div>}
                > */}
                <SearchFilters
                  opportunityStatus={status}
                  eligibility={eligibility}
                  category={category}
                  fundingInstrument={fundingInstrument}
                  agency={agency}
                  searchResultsPromise={searchResultsPromise}
                />
                {/* </Suspense> */}
              </ContentDisplayToggle>
            </div>
            <div className="tablet:grid-col-8">
              <SearchResults
                searchParams={convertedSearchParams}
                query={query}
                loadingMessage={t("loading")}
                searchResultsPromise={searchResultsPromise}
              ></SearchResults>
            </div>
          </div>
        </div>
      </QueryProvider>
    </>
  );
}

// Exports page behind both feature flags
export default withFeatureFlag<SearchPageProps, never>(
  Search,
  "searchOff",
  () => redirect("/maintenance"),
);
