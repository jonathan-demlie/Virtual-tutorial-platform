import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import usePagination from '../../components/MyPagination';
import { Pagination } from '@mui/material';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';


const Spacer = styled.div`
height:20px;
`
export default function Quizes() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const { user } = useSelector((state) => state.auth)

  useEffect(async () => {
    const id = user.data.id
    const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`)
    if (res.status === 200) {
      setQuizzes(res.data.data)
    }
  }, [])

  const [page, setPage] = useState(1);
    const PER_PAGE = 8;

    const count = Math.ceil(quizzes.length / PER_PAGE);
    const _DATA = usePagination(quizzes, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
  console.log(quizzes)
  const view=(value)=>{
    navigate(`/quiz/${value}`)
  }

  const remove=async(value)=>{
    const res = await axios.delete(`http://localhost:5000/api/quiz/${value}`);
    if(res.status===200){
      toast.success(res.data.message)
    }else{
      toast.error(res.data.message)
    }
  }
  const copy = async (value) => {
    await navigator.clipboard.writeText(`http://localhost:3000/quiz/${value}`);
    toast.success("Quiz link copied successfully!")
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">View</TableCell>
              <TableCell align="left">Copy Link</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_DATA.currentData().map((quiz, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{quiz.title}</TableCell>
                <TableCell align="left"><Button variant='contained' onClick={()=>view(quiz.uniqueId)}>View</Button> </TableCell>
                <TableCell align="left"><Button variant='contained' onClick={()=>copy(quiz.uniqueId)}>Copy Link</Button> </TableCell>
                <TableCell align="left"><Button variant='contained' sx={{backgroundColor:'#bb2124'}} onClick={()=>remove(quiz.id)}>Delete</Button> </TableCell>
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
        <Spacer/>
      </TableContainer>
    </div>
  )
}
