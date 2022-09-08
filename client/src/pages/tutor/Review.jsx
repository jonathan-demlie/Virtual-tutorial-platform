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
import usePagination from '../../components/MyPagination';
import { Pagination } from '@mui/material';
import Rating from '@mui/material/Rating';
import styled from 'styled-components'

const Spacer = styled.div`
height:20px;
`

export default function Review() {
    const [review, setReview] = useState([])
    const { user } = useSelector((state) => state.auth)

    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/review/${user.data.id}`);
        if (res.status == 200) {
            setReview(res.data.data)
        }
    }, [])
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(review.length / PER_PAGE);
    const _DATA = usePagination(review, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Student</TableCell>
                            <TableCell align="left">Rate</TableCell>
                            <TableCell align="left">Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_DATA.currentData().map((rev, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{rev.Student&&<a style={{textDecoration:"none"}} href={`/student/${rev.Student.id}`}>{rev.Student.firstName+" "+rev.Student.lastName}</a>}</TableCell>
                                <TableCell align="left"><Rating name="read-only" value={rev.rate} readOnly /></TableCell>
                                <TableCell align="left">{rev.content}</TableCell>
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
                <Spacer />
            </TableContainer>
        </div>
    )
}
