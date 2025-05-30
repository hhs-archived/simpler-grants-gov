import { ExternalRoutes } from "src/constants/routes";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { GridContainer } from "@trussworks/react-uswds";

import { USWDSIcon } from "src/components/USWDSIcon";

const Hero = () => {
  const t = useTranslations("Homepage");

  return (
    <div
      data-testid="homepage-hero"
      className="hero bg-primary-darkest text-white overflow-hidden"
    >
      <GridContainer className="hero--container padding-y-1 tablet:padding-y-3 tablet-lg:padding-y-10 desktop-lg:padding-top-15 desktop-lg:padding-bottom-10 position-relative">
        <div className="hero--text position-relative z-100">
          <h1 className="text-ls-neg-2 line-height-sans-2 font-sans-xl margin-top-3 tablet:font-sans-2xl desktop-lg:font-sans-3xl desktop-lg:margin-top-2 desktop-lg:margin-bottom-5">
            {t("pageTitle")}
          </h1>
          <p className="text-balance font-sans-md margin-y-2 tablet:font-sans-lg tablet:margin-y-3">
            {t("pageDescription")}
          </p>
        </div>
        <span className="usa-dark-background bg-transparent">
          <Link
            className="usa-button usa-button--small usa-button--unstyled usa-button--inverse desktop:position-absolute top-3 right-0 margin-y-1 desktop:margin-y-3 desktop:margin-x-4"
            href={ExternalRoutes.GITHUB_REPO}
            target="_blank"
          >
            <USWDSIcon
              name="github"
              className="usa-icon usa-icon--size-3"
              aria-label="Github"
            />
            {t("githubLink")}
          </Link>
        </span>
      </GridContainer>
    </div>
  );
};

export default Hero;
