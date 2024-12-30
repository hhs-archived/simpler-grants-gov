"use client";

import { merge } from "lodash";
import { useFeatureFlags } from "src/hooks/useFeatureFlags";
import { FeatureFlags } from "src/services/FeatureFlagManager";

import { createContext, useCallback, useMemo, useState } from "react";

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
  // // merge server side flags and client side flags
  // // do we need to rethink our defaulting strategy, or does setting a true default still work for this sort of merge?
  const { featureFlagsManager } = useFeatureFlags();
  const currentFlags = merge(serverSideFlags, featureFlagsManager.featureFlags);
  return (
    <FeatureFlagContext.Provider value={currentFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
