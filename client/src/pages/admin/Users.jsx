import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, FormControlLabel, Pagination } from '@mui/material';
import usePagination from '../../components/MyPagination';


export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    if (res.status == 200) {
      setUsers(res.data.data)
    }
  }, [])
  const handleTutor = () => {
    var newData = users.filter(function (user) {
      return user.role === 'tutor'
    })
    setUsers(newData)
  }
  const handleStudent = () => {
    var newData = users.filter(function (user) {
      return user.role === 'student'
    })
    setUsers(newData)
  }

  const [page, setPage] = useState(1);
  const PER_PAGE = 7;

  const count = Math.ceil(users.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div>
      <div>
        <h2>Filter</h2>
        <div style={{ display: "flex", paddingBottom: "10px" }}>
          <FormControlLabel control={<Checkbox onClick={handleTutor} />} label="Tutor" />
          <FormControlLabel control={<Checkbox onClick={handleStudent} />} label="Student" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 30 }}>No</TableCell>
              <TableCell align="left" style={{ width: 260 }}>Full Name</TableCell>
              <TableCell align="left" style={{ width: 160 }}>Role</TableCell>
              <TableCell align="left" style={{ width: 60 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((user, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ width: 160 }}>
                  {index + 1}
                </TableCell>
                <TableCell align="left" style={{ width: 160 }}>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell><Button variant='contained' style={{ backgroundColor: "#bb2124", }}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </TableContainer>
    </div>
  )
}
