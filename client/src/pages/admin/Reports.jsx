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

export default function Reports() {
    const [reports, setReports] = useState([])

    useEffect(async () => {
        const res = await axios.get('http://localhost:5000/api/report');
        if (res.status == 200) {
            setReports(res.data.data)
        }
    }, [])
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const count = Math.ceil(reports.length / PER_PAGE);
    const _DATA = usePagination(reports, PER_PAGE);

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
                            <TableCell align="left" style={{ width: 260 }}>Tutor</TableCell>
                            <TableCell align="left" style={{ width: 160 }}>Content</TableCell>
                            <TableCell align="left" style={{ width: 60 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_DATA.currentData().map((report, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ width: 160 }}>
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left" style={{ width: 160 }}>{report.firstName + ' ' + report.lastName}</TableCell>
                                <TableCell>{report.content}</TableCell>
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
