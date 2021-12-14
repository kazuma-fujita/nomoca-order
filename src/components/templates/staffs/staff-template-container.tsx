import { StaffListContainer } from 'components/organisms/staffs/staff-list/staff-list-container';
import { StaffTemplate } from 'components/templates/staffs/staff-template';

export const StaffTemplateContainer = () => <StaffTemplate listComponent={<StaffListContainer />} />;
