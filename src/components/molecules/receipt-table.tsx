import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type DisplayProduct = {
  key: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type Props = {
  products: DisplayProduct[];
};

const taxRate = 0.1;

export const ReceiptTable = ({ products }: Props) => {
  const subtotals = products.map((product) => product.unitPrice * product.quantity!);
  const invoiceSubtotal = subtotals.reduce((sum, i) => sum + i, 0);
  const invoiceTaxes = taxRate * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    // <TableContainer component={Paper}>
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell>商品</TableCell>
            <TableCell align='right'>数量</TableCell>
            <TableCell align='right'>単価</TableCell>
            <TableCell align='right'>金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.key}>
              <TableCell>{product.name}</TableCell>
              <TableCell align='right'>{product.quantity}</TableCell>
              <TableCell align='right'>{product.unitPrice.toLocaleString()}</TableCell>
              <TableCell align='right'>{(product.quantity! * product.unitPrice).toLocaleString()}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>小計</TableCell>
            <TableCell align='right'>{invoiceSubtotal.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>税</TableCell>
            <TableCell align='right'>{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
            <TableCell align='right'>{invoiceTaxes.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>合計</TableCell>
            <TableCell align='right'>{invoiceTotal.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
