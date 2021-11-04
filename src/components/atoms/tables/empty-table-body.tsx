import { StyledTableCell } from './styled-table-cell';
import { StyledTableRow } from './styled-table-row';

type Props = {
  headerLength: number;
};

export const EmptyTableBody: React.FC<Props> = ({ headerLength, children }) => {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={headerLength} align='center'>
        {children}
      </StyledTableCell>
    </StyledTableRow>
  );
};
