import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { reset as eduReset} from '../features/education/educationSlice'
import { reset as proReset } from '../features/profile/profileSlice'
import { reset as aboutReset} from '../features/about/aboutSlice'

import { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Nav = styled.nav`
background-color:rgb(32,129,229);
width:100%;
height:${props => props.navDisplay ? "200px" : "60px"};
display:${props => props.navDisplay ? "block" : "flex"};
`;

const UListLeft = styled.ul`
display: flex;
flex-direction:${props => props.navDisplay ? "column" : "row"};
list-style:none;
padding-top:10px;
@media only screen and (max-width: 768px) {
  display:${props => props.navDisplay ? "block" : "none"};
}
`
const UListRight = styled.ul`
position: relative;
float: right;
float:right;
display: flex;
margin-left: auto; 
margin-right: 20px;
flex-direction:${props => props.navDisplay ? "column" : "row"};
list-style:none;
padding-top:10px;
@media only screen and (max-width: 768px) {
  display:${props => props.navDisplay ? "block" : "none"};
}
`

const List = styled.li`
display: flex;
flex-direction:${props => props.navDisplay ? "column" : "row"};
padding:${props => props.navDisplay ? "10px 0px 0px 0px" : "0px 0px 0px 15px"};
display:flex;
align-items:${props => props.navDisplay ? "flex-start" : "center"};
`;
const NavMenu = styled(MenuIcon)`
color:white;
font-size:18px;
padding-top:10px;
padding-left:20px;
visibility:hidden ;
@media only screen and (max-width: 768px) {
  visibility:visible;
}
`;

const Element = styled(Link)`
font-size:18;
color:white;
padding:${props => props.navDisplay ? "10px 0px 0px 0px" : "0px 10px 0px 10px"};
text-decoration:none;
&:hover{
  color:#000000;  
}
`;
const Button = styled.button`
padding:0 10px;
background-color:#2169de;
color:white;
height:40px;
border-radius:5px;
border:none;
font-size:17px;
&:hover{
    cursor:pointer;
    color:black;
}`

const Name = styled.p`
font-size:19px;
font-weight:400;
color:white;
`

const ArrowDown=styled(KeyboardArrowDownOutlinedIcon)`
padding-left:3px;
color:white;
`
const ArrowUp=styled(KeyboardArrowUpOutlinedIcon)`
padding-left:3px;
color:white;
`
// const Dropdown = styled.div`
// position: relative;
// display: inline-block;
// `
const DropdownContent = styled.div`{
    display: ${props => props.displayDropdown ? "flex" : "none"};
    position: absolute;
    background-color:white;
    min-width: 200px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right:20px;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
`
const Column = styled.div`
padding:20px 10px;
display:flex;
flex-direction:column;
`

const DropdownElement = styled.a`
padding:5px 0;
color:black;
text-decoration:none;
&:hover{
    color:blue;
}
`

{/* <List navDisplay={displayMenu}>
                            <Button navDisplay={displayMenu} onClick={onLogout}>Logout</Button>
                        </List> */}

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [displayMenu, setDisplayMenu] = useState(false);
    const [displayDropdown, setDisplayDropdown] = useState(false)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(eduReset())
        dispatch(proReset())
        dispatch(aboutReset())
        setDisplayDropdown(false)
        navigate('/')
    }

    console.log(displayMenu);
    const showDash=async()=>{
        if(user.data.role==="student"){
        navigate('/student/dashboard')
        }else if(user.data.role==="tutor"){
        navigate('/tutor/dashboard')
        }else if(user.data.role==="admin"){
        navigate('/admin/dashboard')
        }
    }
    const handleClick = async (e) => {
        if (displayMenu) {
            setDisplayMenu(false);
        } else {
            setDisplayMenu(true);
        }
        console.log(displayMenu);
    }

    const showDropdown = async () => {
        if (displayDropdown) {
            setDisplayDropdown(false)
        } else {
            setDisplayDropdown(true)
        }
    }
    return (
        <div>
            <Nav navDisplay={displayMenu}>
                <NavMenu onClick={handleClick} />
                <UListLeft navDisplay={displayMenu}>
                    <List navDisplay={displayMenu}>
                        <Element to='/' navDisplay={displayMenu}>Home</Element>
                    </List>
                    <List navDisplay={displayMenu}>
                        <Element to='/tutors' navDisplay={displayMenu}>Find a tutor</Element>
                    </List>
                    <List navDisplay={displayMenu}>
                        <Element to='/how-it-works' navDisplay={displayMenu}>How it Works</Element>
                    </List>
                    <List navDisplay={displayMenu}>
                        <Element to='/register' navDisplay={displayMenu}>Become a tutor</Element>
                    </List>
                </UListLeft>
                <UListRight navDisplay={displayMenu}>
                    {user ? (<>
                        <List>
                            <Name>{user.data.firstName}</Name>
                        </List>
                        <List onClick={showDropdown}>
                            {displayDropdown?<ArrowUp/>:<ArrowDown/>}
                        </List>
                        </>
                    ) : (<>
                        <List>
                            <Button navDisplay={displayMenu}>
                                <Element to='/register' navDisplay={displayMenu}>Register</Element>
                            </Button>
                        </List>
                        <List>
                            <Button navDisplay={displayMenu}>
                                <Element to='/login' navDisplay={displayMenu}>Login</Element>
                            </Button>
                        </List>
                    </>)}
                </UListRight>
            </Nav>
            <DropdownContent displayDropdown={displayDropdown}>
                <Column>
                    <DropdownElement onClick={showDash}>Dashboard</DropdownElement>
                    <DropdownElement onClick={onLogout}>Logout</DropdownElement>
                </Column>
            </DropdownContent>
        </div>
    )
}
