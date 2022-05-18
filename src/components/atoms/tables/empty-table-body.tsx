import { StyledTableCell } from './styled-table-cell';
import { StyledTableRow } from './styled-table-row';

type Props = {
  colSpan: number;
};

export const EmptyTableBody: React.FC<Props> = ({ colSpan, children }) => {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={colSpan} align='center'>
        {children}
      </StyledTableCell>
    </StyledTableRow>
  );
};
