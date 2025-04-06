export const sandbox = import.meta.env.DEV
  ? undefined
  // just allow scripts restrictions in production
  : 'allow-scripts';
