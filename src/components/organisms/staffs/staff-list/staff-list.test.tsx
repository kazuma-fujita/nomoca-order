import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import * as stories from './staff-list.stories';

describe('StaffList', () => {
  const { Default, Loading, Empty } = composeStories(stories);

  test('It renders the staff list.', async () => {
    render(<Default />);
    const rows = screen.getAllByRole('row');
    // th 行も含める
    expect(rows).toHaveLength(4);
    expect(rows[1]).toHaveTextContent('担当者1');
    expect(rows[2]).toHaveTextContent('担当者2');
    expect(rows[3]).toHaveTextContent('担当者3');
    expect(screen.getByRole('cell', { name: '担当者1' })).toBeTruthy();
    // screen.debug();
  });

  test('It renders a loading indicator.', async () => {
    render(<Loading />);
    screen.getByLabelText('Now loading');
  });

  test('It renders empty data.', async () => {
    render(<Empty />);
    screen.getByText('担当者を追加してください');
  });
});
