# Migrate Existing API Consumers

- **Status:** Active
- **Last Modified:** 2025-03-24
- **Related Issue:** [#4199](https://github.com/HHS/simpler-grants-gov/issues/4199)
- **Deciders:** Julius, Lucas
- **Tags:** api, soap, s2s, applicant, grantor

## Context and Problem Statement

We have a large existing S2S API client base located in two primary cohorts:

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

- Ease of migration for consumers
- Minimize impact of supporting the legacy system on new work/innovation
- Ease of support for technical team

## Options Considered

- {option 1}
- {option 2}
- ...

## Decision Outcome

Chosen option: "{option 1}", because {justification. e.g., only option which meets a key decision driver | which satisfies x condition | ... }.

### Positive Consequences

- {e.g., improved performance on quality metric, new capability enabled, ...}
- ...

### Negative Consequences

- {e.g., decreased performance on quality metric, risk, follow-up decisions required, ...}
- ...

## Pros and Cons of the Options

### {option 1}

{example | description | pointer to more information | ...}

- **Pros**
  - Good, because {argument a}
  - Good, because {argument b}
  - ...
- **Cons**
  - Bad, because {argument c}
  - ...

### {option 2}

{example | description | pointer to more information | ...}

- **Pros**
  - Good, because {argument a}
  - Good, because {argument b}
  - ...
- **Cons**
  - Bad, because {argument c}
  - ...

## Links

- \[{Link name}]\(link to external resource)
- ...
