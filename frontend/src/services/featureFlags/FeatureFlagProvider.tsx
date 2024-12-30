"use client";

import { useFeatureFlags } from "src/hooks/useFeatureFlags";
import { FeatureFlags } from "src/services/FeatureFlagManager";

import { createContext } from "react";

// interface FeatureFlagContextParams {
//   flags: FeatureFlags;
// }

export const FeatureFlagContext = createContext({} as FeatureFlags);

export default function FeatureFlagProvider({
  children,
  serverSideFlags,
}: {
  children: React.ReactNode;
  serverSideFlags: FeatureFlags;
}) {
  // eslint-disable-next-line
  console.log("$$$$ in provider before hook", serverSideFlags);
  // // merge server side flags and client side flags
  // // do we need to rethink our defaulting strategy, or does setting a true default still work for this sort of merge?
  const { featureFlagsManager } = useFeatureFlags(serverSideFlags);
  // const currentFlags = merge(serverSideFlags, featureFlagsManager.featureFlags);
  // eslint-disable-next-line
  console.log("$$$$ in provider after hook", featureFlagsManager.featureFlags);

  return (
    <FeatureFlagContext.Provider value={featureFlagsManager.featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
