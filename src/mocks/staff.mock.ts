import { Staff, Type } from 'API';

export const staffMock: Staff = {
  __typename: 'Staff',
  id: 'DummyStaffID',
  name: '',
  type: Type.staff,
  viewOrder: 1,
  disabled: false,
  createdAt: '2021-11-25T14:32:55Z',
  updatedAt: '2021-11-25T14:32:55Z',
};
