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
    const { user } = useSelector((state) => state.auth)
    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/api/payment/${user.data.id}`);
        if (res.status == 200) {
            setPayments(res.data.data)
        }
    }, [])

    const [totalEarning, setTotalEarning] = useState()

    useEffect(() => {
        var total = 0;
        for (var i = 0; i < payments.length; i++) {
            if (payments[i].status === 'paid') {
                total += payments && payments[i].totalAmount;
            }
        }
        var newTot = (total * 95) / 100
        setTotalEarning(newTot)
    }, [payments])
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
            <div style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                <h2>Total Earnings</h2>
                <h1 style={{ paddingLeft: "20px", fontSize: "25px" }}>{" " + totalEarning+" Birr"}</h1>
            </div>
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
                                    <TableCell align="left" >{<a style={{ textDecoration: "none" }} href={`/student/${pay.Sender && pay.Sender.id}`}>{pay && pay.Sender && pay.Sender.firstName + " " + pay.Sender.lastName}</a>}</TableCell>
                                    <TableCell align="left">{<a style={{ textDecoration: "none" }} href={`/student/${pay.Reciever && pay.Reciever.id}`}>{pay && pay.Reciever && pay.Reciever.firstName + " " + pay.Reciever.lastName}</a>}</TableCell>
                                    <TableCell align="left">{pay && pay.totalAmount}</TableCell>
                                    <TableCell align="left">{pay && pay.status}</TableCell>
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
