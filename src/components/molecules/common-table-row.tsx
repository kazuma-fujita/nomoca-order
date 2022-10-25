import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, IconButton, TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { StyledSecondaryTableRow } from 'components/atoms/tables/styled-secondary-table-row';
import { StyledTableCell } from 'components/atoms/tables/styled-table-cell';
import { ReceiptTable } from 'components/molecules/receipt-table';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';
import React from 'react';
import { useToggle } from 'react-use';

type Props = {
  colSpan: number;
  products: NormalizedProduct[];
  isProductsRowOpen?: boolean;
};

export const CommonTableRow: React.FC<Props> = ({ colSpan, products, isProductsRowOpen = false, children }) => {
  const [on, toggle] = useToggle(isProductsRowOpen);
  return (
    <>
      <TableRow>
        <TableCell align='center'>
          <IconButton aria-label='expand row' onClick={toggle}>
            {on ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <>{children}</>
      </TableRow>
      <StyledSecondaryTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan}>
          <Collapse in={on} timeout='auto' unmountOnExit>
            <Box pb={4}>
              <ReceiptTable products={products} />
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledSecondaryTableRow>
    </>
  );
};
