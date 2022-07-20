import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { taxRate } from 'constants/tax-rate';
import { calcTotalFromProductList } from 'functions/orders/calc-total-taxes-subtotal';
import { NormalizedProduct } from 'hooks/subscription-orders/use-fetch-subscription-order-list';

type Props = {
  products: NormalizedProduct[];
};

export const ReceiptTable = ({ products }: Props) => {
  const { total, taxes, subtotal } = calcTotalFromProductList(products);
  return (
    <TableContainer>
      <Table aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell>商品</TableCell>
            <TableCell align='right'>数量</TableCell>
            <TableCell align='right'>単価(円)</TableCell>
            <TableCell align='right'>金額(円)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.relationID}>
              <TableCell>{product.name}</TableCell>
              <TableCell align='right'>{product.quantity}</TableCell>
              <TableCell align='right'>{product.unitPrice.toLocaleString()}</TableCell>
              <TableCell align='right'>{(product.quantity * product.unitPrice).toLocaleString()}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>小計</TableCell>
            <TableCell align='right'>{subtotal.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>税</TableCell>
            <TableCell align='right'>{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
            <TableCell align='right'>{taxes.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>合計</TableCell>
            <TableCell align='right'>{total.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
