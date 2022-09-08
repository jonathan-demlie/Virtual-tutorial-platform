import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import moment from 'moment';
import { Button, Checkbox, FormControlLabel, Pagination } from '@mui/material';
import usePagination from '../../components/MyPagination';
import { toast } from 'react-toastify';

import styled from 'styled-components';
const Spacer = styled.div`
height:20px;
`

export default function Schedules() {
  const [schedules, setSchedules] = useState([])
  const { user } = useSelector((state) => state.auth)

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/api/schedules/${user.data.id}`);
    if (res.status == 200) {
      setSchedules(res.data.data)
    }
  }, [])


  const handlePending = () => {
    var newData = schedules.filter(function (sch) {
      return sch.status === 'pending'
    })
    setSchedules(newData)
  }
  const handleAccepted = () => {
    var newData = schedules.filter(function (sch) {
      return sch.status === 'accepted'
    })
    setSchedules(newData)
  }
  const handleRejected = () => {
    var newData = schedules.filter(function (sch) {
      return sch.status === 'rejected'
    })
    setSchedules(newData)
  }

  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(schedules.length / PER_PAGE);
  const _DATA = usePagination(schedules, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  // Delete schedules
  const remove = async (value) => {
    const res = await axios.delete(`http://localhost:5000/api/schedule/${value}`);
    if (res.status === 200) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }

  // nav to checkout
  const navigation = useNavigate()
  const navToCheckout = (value) => {
    navigation(`/checkout/${value}`)
  }
  return (
    <div>
      <div>
        <h2>Filter</h2>
        <div style={{ display: "flex", paddingBottom: "10px" }}>
          <FormControlLabel control={<Checkbox onClick={handlePending} />} label="Pending" />
          <FormControlLabel control={<Checkbox onClick={handleAccepted} />} label="Accepted" />
          <FormControlLabel control={<Checkbox onClick={handleRejected} />} label="Rejected" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 30 }}>No</TableCell>
              <TableCell align="left" >Tutor name</TableCell>
              <TableCell align="left" >Title</TableCell>
              <TableCell align="left" >Start Time</TableCell>
              <TableCell align="left" >End Time</TableCell>
              <TableCell align="left" >Status</TableCell>
              <TableCell align="left" >Edit</TableCell>
              <TableCell align="left" >Payment</TableCell>
              <TableCell align="left" >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((schedule, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left" >{<a style={{ textDecoration: "none" }} href={`/tutor/${schedule.TutorId.id}`}>{schedule.TutorId.firstName + " " + schedule.TutorId.lastName}</a>}</TableCell>
                <TableCell align="left" >{schedule.title}</TableCell>
                <TableCell align="left" >{moment(schedule.startDate).format('LLL')}</TableCell>
                <TableCell align="left" >{moment(schedule.endDate).format('LLL')}</TableCell>
                <TableCell align="left">{schedule.status}</TableCell>
                <TableCell align="left">{<Button variant='contained'>Edit</Button>}</TableCell>
                {schedule.status === 'accepted' ?
                  <TableCell align="left">{<Button variant='contained' onClick={() => navToCheckout(schedule.id)}>Pay</Button>}</TableCell> :
                  <TableCell align="left">{<Button disabled>Pay</Button>}</TableCell>}
                <TableCell align="left"><Button variant='contained' style={{ backgroundColor: "#bb2124", }} onClick={() => remove(schedule.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Spacer />
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChange}
          color="primary"
        />
        <Spacer />
      </TableContainer>
    </div>
  )
}
