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

import moment from 'moment';
import { Button, Checkbox, FormControlLabel, FormGroup, Pagination } from '@mui/material';
import usePagination from '../../components/MyPagination';
import { toast } from 'react-toastify';
import styled from 'styled-components'

const Spacer = styled.div`
height:10px;
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
      return sch.status ==='pending'
    })
    setSchedules(newData)
  }
  const handleAccepted = () => {
    var newData = schedules.filter(function (sch) {
      return sch.status ==='accepted'
    })
    setSchedules(newData)
  }
  const handleRejected = () => {
    var newData = schedules.filter(function (sch) {
      return sch.status ==='rejected'
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

  // accept reject and delete functions
  const accept = async (value) => {
    const data = {
      status: "accepted"
    }
    const res = await axios.put(`http://localhost:5000/api/schedule/accept/${value}`, data);
    if (res.status === 200) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  }
  const reject = async (value) => {
    const data = {
      status: "rejected"
    }
    const res = await axios.put(`http://localhost:5000/api/schedule/accept/${value}`, data);
    if (res.status === 200) {
      toast.success("Schedule rejected successfully.")
    } else {
      toast.error("Error occured while rejecting a schedule.")
    }
  }

  const remove = async (value) => {
    const res = await axios.delete(`http://localhost:5000/api/schedule/${value}`);
    if (res.status === 200) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
    window.location.reload(true);
  }

  return (
    <div>
      <div>
        <h2>Filter</h2>
        <div style={{ display: "flex", paddingBottom: "10px" }}>
          <FormControlLabel control={<Checkbox onClick={handlePending} />} label="Pending" />
          <FormControlLabel control={<Checkbox onClick={handleAccepted}/>} label="Accepted" />
          <FormControlLabel control={<Checkbox onClick={handleRejected}/>} label="Rejected" />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ width: 30 }}>No</TableCell>
              <TableCell align="left" >Student Name</TableCell>
              <TableCell align="left" >Title</TableCell>
              <TableCell align="left" >Start Time</TableCell>
              <TableCell align="left" >End Time</TableCell>
              <TableCell align="left" >Accept</TableCell>
              <TableCell align="left" >Reject</TableCell>
              <TableCell align="left" >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((schedule, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left" >{<a style={{ textDecoration: "none" }} href={`/student/${schedule.StudentId.id}`}>{schedule.StudentId.firstName + " " + schedule.StudentId.lastName}</a>}</TableCell>
                <TableCell align="left" style={{ width: 160 }}>{schedule.title}</TableCell>
                <TableCell align="left" style={{ width: 160 }}>{moment(schedule.startDate).format('LLL')}</TableCell>
                <TableCell align="left" style={{ width: 160 }}>{moment(schedule.endDate).format('LLL')}</TableCell>
                <TableCell align="left">{schedule.status === "pending" && <Button variant='contained' onClick={() => accept(schedule.id)}>Accept</Button>}{schedule.status === "accepted" && <Button>Accepted</Button>}</TableCell>
                <TableCell align="left">{schedule.status === 'pending' && <Button variant='contained' style={{ backgroundColor: "#bb2124", }} onClick={() => reject(schedule.id)}>Reject</Button>}{schedule.status === 'rejected' && <Button>Rejected</Button>}</TableCell>
                <TableCell align="left"><Button variant='contained' style={{ backgroundColor: "#bb2124", }} onClick={() => remove(schedule.id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Spacer />
        <Spacer />
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChange}
          color="primary"
        />
        <Spacer />
        <Spacer />
      </TableContainer>
    </div>
  )
}
