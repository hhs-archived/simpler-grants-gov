import { featureFlags } from "src/constants/environments";
import UserProvider from "src/services/auth/UserProvider";
import FeatureFlagProvider from "src/services/featureFlags/FeatureFlagProvider";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <FeatureFlagProvider envVarFlags={featureFlags}>
        {children}
      </FeatureFlagProvider>
    </UserProvider>
  );
}
