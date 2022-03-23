import { Staff, Type } from 'API';

export const staffMock: Staff = {
  __typename: 'Staff',
  id: 'dummyStaffID',
  firstName: '',
  lastName: '',
  type: Type.staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2022-11-25T14:32:55Z',
  updatedAt: '2022-11-25T14:32:55Z',
};

export const staffListMock: Staff[] = [...Array(3)].map((_, i) => ({
  ...staffMock,
  id: `dummyStaffID-${i + 1}`,
  firstName: `発注担当者名${i + 1}`,
  lastName: '発注担当者性',
  viewOrder: i + 1,
  updatedAt: new Date(2021, 1 + i, 2 + i, 12 + i, 30 + i, 0).toISOString(),
}));
