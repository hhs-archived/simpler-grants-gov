# Migrate Existing API Consumers

- **Status:** Active
- **Last Modified:** 2025-03-24
- **Related Issue:** [#4199](https://github.com/HHS/simpler-grants-gov/issues/4199)
- **Deciders:** Julius, Lucas
- **Tags:** api, soap, s2s, applicant, grantor

## Context and Problem Statement

We have a large existing S2S API client base split into two primary cohorts:

1. Other Federal Government Agencies - Grantors, USASpending, etc.
2. Applicants (data suggests this is primarily Universities, Hospital/Healthcare Groups, State/County/Local Governments)

The level of S2S utilization, size of the user community, and the major differences between SOAP and REST and the authentication methods for the existing and Simpler APIs, leads us to the finding that we will need a way to continuing supporting the SOAP dialect of these APIs for the foreseeable future. Given that many API consumers are other Federal Agency IT Systems, we're anticipating needing a long runway, once the Simpler API has feature parity, to allow agencies to budget, contract, develop, and deploy changes to their systems that will consume the Simpler API instead of the SOAP API.

Given that long timeline we have two options:

1. Accelerating the availability of a REST API
2. Decoupling support for a SOAP API from retirement of the existing system

Both of these options would allow SOAP API consumers more time to get through the migration process. The first option by giving them a REST API sooner, allowing for the process to start earlier. The second option allows for more time on the backend by allowing consumers to start later, supporting them on SOAP for longer.

Regardless of approach, we need to support complete data being accessible to existing SOAP consumers up-to and through their implementation of REST.

But the fundamental question is, how do we support existing SOAP consumers long enough that they can migrate to the Simpler REST APIs?

## Decision Drivers

- Ease of migration for SOAP consumers
- Minimize impact of supporting the legacy system on new work/innovation
- Ease of support for technical team
- Data must appear unified behind a single API call for both SOAP and REST calls (for data that will exist in Simpler)
  - To avoid breaking existing workflows before they can move off SOAP, and to support consumers moving to REST while still needing historical data.

## Options Considered

- REST wrapper around existing grants.gov SOAP API
- SOAP wrapper around Simpler REST API
- Only support existing SOAP API
- Do nothing to help SOAP consumers

## Decision Outcome

Chosen option: "SOAP wrapper around Simpler REST API", because it provides the best support for existing SOAP consumers without limiting new REST API and other system design of Simpler.

### Positive Consequences

- {e.g., improved performance on quality metric, new capability enabled, ...}
- ...

### Negative Consequences

- {e.g., decreased performance on quality metric, risk, follow-up decisions required, ...}
- ...

## Pros and Cons of the Options

### REST wrapper around existing grants.gov SOAP API

{example | description | pointer to more information | ...}

- **Pros**

  - Good, because {argument a}

- **Cons**

  - Would require defining our entire REST API schema up-front or require a second migration later for consumers
  - Limits new

### SOAP Wrapper around Simpler REST API

{example | description | pointer to more information | ...}

- **Pros**

  - Good, because {argument a}

- **Cons**

  - Bad, because {argument c}

### Only support existing SOAP API

Modernize under the hood but continue to support the existing SOAP API schemas/footprint as our Simpler API

- **Pros**
  - Consumers don't have to change anything to pick up new API integration
- **Cons**
  - Severely limits modernization/innovation efforts
  - Provides no way to adjust workflow or process deficiencies given we need to support the existing way things work.

### Do nothing to help SOAP consumers

Let the SOAP API languish while more and more data and API functionality shifts to the REST API until the point that new data will only appear in the REST API and the SOAP API will be a dead end.

- **Pros**
  - No extra technical work
- **Cons**
  - Consumers control which API they pull data from but not which API gets applications so this would lead to confusion and data being lost/missed.
  - Before REST work is complete the REST API has a degraded experience, requiring parallel implementations of REST/SOAP.
  - After REST work is complete the SOAP API has a degraded experience, giving a very short runway for cutting over from SOAP to REST.

## Links

- \[{Link name}]\(link to external resource)
- ...
