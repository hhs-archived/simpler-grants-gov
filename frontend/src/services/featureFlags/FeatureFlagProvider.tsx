"use client";

import { useFeatureFlags } from "src/hooks/useFeatureFlags";
import { FeatureFlags } from "src/services/FeatureFlagManager";

import { createContext } from "react";

export const FeatureFlagContext = createContext({} as FeatureFlags);

export default function FeatureFlagProvider({
  children,
  envVarFlags,
}: {
  children: React.ReactNode;
  envVarFlags: FeatureFlags;
}) {
  const { featureFlagsManager } = useFeatureFlags(envVarFlags);

  return (
    <FeatureFlagContext.Provider value={featureFlagsManager.featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}
