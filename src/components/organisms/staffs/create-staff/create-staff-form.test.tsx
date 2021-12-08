import { composeStories } from '@storybook/testing-react';
import { waitFor, render, screen } from '@testing-library/react';
import * as stories from './create-staff-form.stories';
import { userEvent } from '@storybook/testing-library';

describe('CreateStaffForm', () => {
  const { Default } = composeStories(stories);

  test('It renders the staff form.', async () => {
    render(<Default />);
    screen.getByRole('dialog', { name: '担当者を追加する' });
    screen.getByRole('textbox', { name: '担当者名' });
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('キャンセル');
    expect(buttons[1]).toHaveTextContent('追加する');
  });

  test('It valid an empty input.', async () => {
    render(<Default />);
    const submitButton = screen.getByRole('button', { name: '追加する' });
    await waitFor(async () => {
      userEvent.click(submitButton);
    });
    screen.getByText('担当者名を入力してください');
  });
});
