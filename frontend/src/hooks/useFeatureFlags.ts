import Cookies from "js-cookie";
import {
  FeatureFlags,
  FeatureFlagsManager,
} from "src/services/FeatureFlagManager";

import { useEffect, useState } from "react";

/**
 * React hook for reading and managing feature flags in client-side code.
 *
 * ```
 * function MyComponent() {
 *   const {
 *     featureFlagsManager,  // An instance of FeatureFlagsManager
 *     mounted,  // Useful for hydration
 *     setFeatureFlag,  // Proxy for featureFlagsManager.setFeatureFlagCookie that handles updating state
 *   } = useFeatureFlags()
 *
 *   if (featureFlagsManager.isFeatureEnabled("someFeatureFlag")) {
 *     // Do something
 *   }
 *
 *   if (!mounted) {
 *     // To allow hydration
 *     return null
 *   }
 *
 *   return (
 *     ...
 *   )
 * }
 * ```
 */
export function useFeatureFlags(serverSideFlags?: FeatureFlags) {
  const [featureFlagsManager, setFeatureFlagsManager] = useState(
    new FeatureFlagsManager({ cookies: Cookies, serverSideFlags }),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function setFeatureFlag(name: string, value: boolean) {
    featureFlagsManager.setFeatureFlagCookie(name, value);
    setFeatureFlagsManager(new FeatureFlagsManager({ cookies: Cookies }));
  }

  return { featureFlagsManager, mounted, setFeatureFlag };
}
