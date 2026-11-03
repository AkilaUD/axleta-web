import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PreloaderContextValue = {
  /** True once the intro overlay has finished (or was skipped). */
  ready: boolean;
  markReady: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  ready: true,
  markReady: () => undefined,
});

export function usePreloader() {
  return useContext(PreloaderContext);
}

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(
    () => ({
      ready,
      markReady: () => setReady(true),
    }),
    [ready],
  );

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const PRELOADER_SESSION_KEY = "axleta-preloader-seen";
