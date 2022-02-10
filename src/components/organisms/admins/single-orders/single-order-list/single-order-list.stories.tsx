import type { ComponentStoryObj } from '@storybook/react';
import { singleOrderItems } from 'mocks/order-list.mock';
import { NowDateContextProvider } from 'stores/use-now-date';
import { SingleOrderList } from './single-order-list';

type Story = ComponentStoryObj<typeof SingleOrderList>;

export default { component: SingleOrderList };

export const Default: Story = {
  args: { data: singleOrderItems },
  decorators: [
    (StoryComponent) => (
      <NowDateContextProvider now={new Date(2023, 0, 1, 9)}>
        <StoryComponent />
      </NowDateContextProvider>
    ),
  ],
};

export const Loading: Story = {
  ...Default,
  args: { isLoading: true },
};

export const Empty: Story = {
  ...Default,
  args: { isEmptyList: true },
};

export const FetchError: Story = {
  ...Default,
  args: { error: Error('The API fetched data but it returned null.') },
};
