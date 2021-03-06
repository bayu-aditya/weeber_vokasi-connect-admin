import React, { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const AspirationCenter = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const url = 'https://api.vokasiconnect.id';
    const headers = new Headers();

    headers.append('Authorization', `Bearer ${Cookies.get('access_token')}`);

    fetch(`${url}/aspirations`, {
      headers: headers
    })
      .then((res) => res.json())
      .then((data) => {
        setState(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

  const classes = useStyles();

  return (
    <div className="aspiration-center">
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell align="right">NPM</TableCell>
              <TableCell align="right">Prodi</TableCell>
              <TableCell align="right">No Hp</TableCell>
              <TableCell align="right">Keluhan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.map((row, i) => (
              <TableRow key={`aspirasi-${row.name}-${i}`}>
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right">{row.npm}</TableCell>
                <TableCell align="right">{row.prodi}</TableCell>
                <TableCell align="right">{row.no_hp}</TableCell>
                <TableCell align="right">{row.keluhan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AspirationCenter;
