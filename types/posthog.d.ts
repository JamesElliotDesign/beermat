type BeerMatPostHogProperties = Record<string, string | number | boolean | undefined>;

type BeerMatPostHog = {
  capture: (event: string, properties?: BeerMatPostHogProperties) => void;
};

declare global {
  interface Window {
    posthog?: BeerMatPostHog;
  }
}

export {};
