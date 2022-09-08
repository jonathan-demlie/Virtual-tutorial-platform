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

import { Button, Pagination } from '@mui/material';
import usePagination from '../../components/MyPagination';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Spacer = styled.div`
height:30px;
`
const Img = styled.img`
width:50px;
height:50px;
`
export default function Verify() {
  const [verify, setVerify] = useState([])

  useEffect(async () => {
    const res = await axios.get('http://localhost:5000/api/verify');
    if (res.status == 200) {
      setVerify(res.data.data)
      console.log(res.data.data)
    }
  }, [])
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const count = Math.ceil(verify.length / PER_PAGE);
  const _DATA = usePagination(verify, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const navigate = useNavigate()
  const remove = async (value) => {
    const res = await axios.delete(`http://localhost:5000/api/verify/${value}`);
    if (res.status === 200) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }
  const verifyAccount = async (value) => {
    const res = await axios.put(`http://localhost:5000/api/verify/${value}`);
    if (res.status === 200) {
      toast.success("User profile verified successfully!")
    } else {
      toast.error("Account verification faild!")
    }
  }
  const navTo = (value) => {
    window.open(`http://localhost:5000/${value}`,'_blank')
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 30 }}>No</TableCell>
              <TableCell align="left" >Name</TableCell>
              <TableCell align="left" >File</TableCell>
              <TableCell align="left" >Verify</TableCell>
              <TableCell align="left" >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              _DATA.currentData().map((ver, index) => (

                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ width: 30 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" >{<a style={{textDecoration:"none"}} href={`/tutor/${ver.userId}`}>{ver && ver.firstName + " " + ver.lastName}</a>}</TableCell>
                  <TableCell align="left"><Button onClick={()=>navTo(ver.pdf)}>Open File</Button></TableCell>
                  <TableCell align="left"><Button variant='contained' onClick={()=>verifyAccount(ver.userId)} >Verify</Button></TableCell>
                  <TableCell align="left"><Button variant='contained' style={{ backgroundColor: "#bb2124", }} onClick={()=>remove(ver.id)}>Delete</Button></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </TableContainer></div>
  )
}
