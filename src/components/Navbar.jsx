import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/styles.css';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007AFF;
  margin: 0 10px;
`;

function Navbar() {
const navigate = useNavigate();
  return (
    <NavbarContainer>
    <button style={{ border: 'none', background: 'none', position: 'relative', left: '-38%' }} onClick={() => navigate('/homer')}><img class="logo" src={require('/Users/heitor/Aulas LOCAL/BOER/macarrao-restaurant/src/images/RISELOGO.webp')} alt=''></img></button>
      <div>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/signup">Cadastrar</NavLink>
        <NavLink to="/homer">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;