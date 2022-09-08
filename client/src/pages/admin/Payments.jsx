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

const Spacer = styled.div`
height:30px;
`
export default function Payments() {
    const [payments, setPayments] = useState([])

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/api/payments');
        if (res.status == 200) {
            setPayments(res.data.data)
        }
    }, [])
    const [page, setPage] = useState(1);
    const PER_PAGE = 8;

    const count = Math.ceil(payments.length / PER_PAGE);
    const _DATA = usePagination(payments, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 30 }}>No</TableCell>
                            <TableCell align="left" >Sender Name</TableCell>
                            <TableCell align="left" >Reciever Name</TableCell>
                            <TableCell align="left" >Total Amount</TableCell>
                            <TableCell align="left" >Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            _DATA.currentData().map((pay, index) => (

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ width: 30 }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left" >{<a style={{textDecoration:"none"}} href={`/student/${pay.Sender&&pay.Sender.id}`}>{pay&&pay.Sender&& pay.Sender.firstName+" "+pay.Sender.lastName}</a>}</TableCell>
                                    <TableCell align="left">{<a style={{textDecoration:"none"}} href={`/student/${pay.Reciever&&pay.Reciever.id}`}>{pay&&pay.Reciever&& pay.Reciever.firstName+" "+pay.Reciever.lastName}</a>}</TableCell>
                                    <TableCell align="left">{pay&&pay.totalAmount}</TableCell>
                                    <TableCell align="left">{pay&&pay.status}</TableCell>
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
            </TableContainer>
        </div>
    )
}
