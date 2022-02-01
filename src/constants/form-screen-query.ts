const queryName = 'screen';

export const FormScreenType = {
  input: 'input',
  confirm: 'confirm',
  complete: 'complete',
} as const;

export const FormScreenQuery = {
  input: `${queryName}=${FormScreenType.input}`,
  confirm: `${queryName}=${FormScreenType.confirm}`,
  complete: `${queryName}=${FormScreenType.complete}`,
} as const;

export type Path = typeof FormScreenQuery[keyof typeof FormScreenQuery];
