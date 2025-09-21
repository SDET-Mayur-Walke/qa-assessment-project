import { useState } from "react";

export function useFeatureFlags() {
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  const setFlag = (name: string, enabled: boolean) => {
    setFlags(prev => ({
      ...prev,
      [name]: enabled
    }));
  };

  const toggleFlag = (name: string) => {
    setFlags(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const clearFlags = () => {
    setFlags({});
  };

  return {
    flags,
    setFlag,
    toggleFlag,
    clearFlags
  };
}