import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { SWRConfig } from 'swr';

const AllTheProviders: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>{children}</SWRConfig>
);
export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });
