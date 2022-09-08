import React, { useEffect, useState } from 'react'
import { Grid, Card, Rating, CardContent, Avatar, Pagination } from '@mui/material'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Navbar from '../components/Navbar';
import usePagination from '../components/MyPagination';
import Footer from '../components/Footer';

const Title = styled.p`
padding:10px 0;
font-size:20px;
`
const Num = styled.p`
font-size:60px;
`
const Col = styled.div`
display:flex;
flex-direction:column;
`
const Row = styled.div`
padding:20px;
display:flex;
`
const Row2 = styled.div`
padding-top:10px;
display:flex;
`
const Row3 = styled.div`
display:flex;
justify-content:space-between;
`
const P = styled.p`
padding:5px;
`
const Name = styled.h6`
font-size:14px;
padding:10px;
`
const Content = styled.p`
padding-top:5px;
padding-left:7px;
font-size:16px;
`
const Container = styled.div`
padding-top:10px;
dislay:flex;
justify-content:start;
`
const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  pl: 4,
  pr: 4,
  pt: 2,
  pb: 4,
};
const Form = styled.form`
margin-top:10px;
padding-top:20px;
`
const Spacer = styled.div`
height:20px;
`
export default function Reviews() {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [myReview, setMyReview] = useState({})

  useEffect(async () => {
    const res = await axios.get(`http://localhost:5000/api/review/${id}`);
    if (res.status == 200) {
      setMyReview(res.data.data)
    }
  }, [])
  let total = 0;
  let review = [];

  for (var i = 0; i < myReview.length; i++) {
    if (myReview[i].tutorId == id) {
      total += myReview[i].rate;
      review.push(myReview[i])
    }

  }
  let totalRate = Math.round((total / review.length) * 10) / 10;

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
      <Navbar />
      <Spacer />
      <Spacer />
      <Spacer />
      <Grid sx={{ paddingLeft: '30px', paddingRight: '30px' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={4} md={4} sm={12} sx={{ marginLeft: '20px' }}>
          <Card variant="outlined">
            <React.Fragment>
              <CardContent>
                <Title>Total Rate</Title>
                <Row>
                  <Col>
                    <Num>{totalRate ? totalRate : 0}</Num>
                    <Rating name="half-rating-read" value={totalRate ? totalRate : 0} precision={0.5} readOnly />
                    <Row2>
                      <PersonOutlineIcon />
                      <P>{review ? review.length : 0}</P>
                    </Row2>
                  </Col>
                  <Col>
                    <Row>
                    </Row>
                  </Col>
                </Row>
              </CardContent>
            </React.Fragment>
          </Card>
        </Grid>
        <Grid item lg={6} md={8} sm={12} sx={{ marginLeft: '20px' }}>
          <Col>
            <>{review && _DATA.currentData().map((rev) => (
              <>
                <Card>
                  <Row key={rev.id}>
                    <Avatar
                      alt={rev.Student.firstName}
                      src={rev.Student&&'http://localhost:5000/' + rev.Student.profile.img}
                      sx={{
                        width: 50, height: 50, justifyContent: "center", display: "flex"
                      }}
                    >
                    </Avatar>
                    <Col>
                      <Name>{rev.Student&&rev.Student.firstName+" "+rev.Student.lastName}</Name>
                      <Rating name="half-rating-read" value={rev.rate} size="small" readOnly sx={{
                        paddingLeft: "7px"
                      }} />
                      <Content>
                        {rev.content}
                      </Content>
                    </Col>
                  </Row>
                </Card>
                <Spacer />
              </>
            ))
            }</>
            <Spacer/>
            <Pagination
              count={count}
              size="large"
              page={page}
              onChange={handleChange}
              color="primary"
            />
            <Spacer/>
            <Spacer/>
          </Col>
        </Grid>
        <Grid item lg={2} md={0} sm={0} >
        </Grid>
      </Grid>
      <Footer/>
    </div>
  )
}
