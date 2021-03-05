//Encinas Nahuel - Olimpia Challenge
//Import de librerias.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//Import de iconos.
import { HiOutlineGlobe } from 'react-icons/hi';
import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
//Import de componentes.
import ModalLang from '../../containers/Modal/ModalLang';
//Import de media querys.
import { media } from '../../../const/mediaQuerys';

const Footer = () => {
  const [modalLang, setModalLang] = useState(false);

  const openModalLang = () => setModalLang(true);
  const closeModalLang = () => setModalLang(false);

  return (
    <StyledContainer>
      <StyledLinks>
        <StyledSection>
          <div>VER MAS SOBRE LA PAGINA</div>
          <Link to="/home">Pagina de Inicio</Link>
          <Link to="/recipes">Recetas</Link>
          <Link to="/week">Menu de la semana</Link>
          <Link to="/wishlist">Favoritos</Link>
          <Link to="/order">Seguir pedido</Link>
        </StyledSection>
        <StyledSection>
          <div>OPCIONES DEL USUARIO</div>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/signup">Registrarse</Link>
          <Link to="/cart">Carrito de compras</Link>
          <span onClick={openModalLang}>Cambiar idioma</span>
          <span onClick={openModalLang}>Cambiar moneda</span>
        </StyledSection>
        <StyledSection>
          <div>REDES SOCIALES</div>
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.instagram.com">Instagram</a>
          <a href="https://www.twitter.com">Twitter</a>
          <a href="https://www.whatsapp.com">Whatsapp</a>
        </StyledSection>
      </StyledLinks>

      <StyledFooter>
        <StyledCont>
          <StyledDiv>
            <div>© 2021 Foody+, Inc. All rights reserved</div>
            <StyledCont>
              <StyledSpan>-</StyledSpan>
              <Link to="/privacy">Privacidad</Link>
              <span>-</span>
              <Link to="/terms">Términos</Link>
            </StyledCont>
          </StyledDiv>
        </StyledCont>
        <StyledCont>
          <StyledPreferences onClick={openModalLang}>
            <StyledPreferences>
              <HiOutlineGlobe size="2rem" />
              Español
            </StyledPreferences>
            <div>USD - $</div>
          </StyledPreferences>
          <StyledSocial>
            <a href="https://www.facebook.com">
              <FaFacebookSquare size="2rem" />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagramSquare size="2rem" />
            </a>
            <a href="https://www.twitter.com">
              <FaTwitter size="2rem" />
            </a>
          </StyledSocial>
        </StyledCont>
      </StyledFooter>
      <ModalLang isOpen={modalLang} closeModal={closeModalLang} />
    </StyledContainer>
  );
};

// =================== ESTILOS CSS ===================
const StyledContainer = styled.div`
  max-width: 100vw;
  height: max-content;
  padding: 0 10%;
  background-color: var(--light-gray);
  border-top: 2px solid var(--mid-gray);
`;
const StyledLinks = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr;
  width: 100%;

  ${media.tab} {
    grid-template: 1fr 1fr / 1fr 1fr;
  }
  ${media.desktop} {
    grid-template: 1fr / repeat(3, 1fr);
  }
`;
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0 10px;

  ${media.desktop} {
    padding: 40px 0 20px;
  }

  div {
    margin-bottom: 20px;
    font-weight: 600;
  }
  a,
  span {
    margin-bottom: 20px;
  }
  span:hover,
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
//
const StyledFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 164px;
  padding-bottom: 64px;
  border-top: 2px solid var(--mid-gray);

  ${media.tab} {
    height: 100px;
    padding-bottom: 0;
  }
  ${media.desktop} {
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
  }

  span {
    padding: 6px 10px;
  }

  a:hover {
    text-decoration: underline;
  }
`;
const StyledCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPreferences = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  div {
    margin-left: 10px;
    cursor: pointer;
  }
  svg {
    margin-right: 6px;
  }
  div:hover {
    text-decoration: underline;
  }
`;
const StyledSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  ${media.mobile} {
    margin-left: 30px;
  }

  a {
    margin-left: 10px;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  margin-top: 8px;

  ${media.tab} {
    flex-direction: row;
    justify-content: center;
    height: max-content;
  }
`;
const StyledSpan = styled.span`
  display: none;

  ${media.tab} {
    display: block;
  }
`;

export default Footer;
