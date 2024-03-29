//Encinas Nahuel - Olimpia Challenge
//Import de librerias.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//Import de layout.
import Layout from '../../layout/Layout';
//Import de componentes.
import InputDefault from '../../shared/inputs/InputDefault';
import ButtonDefault from '../../shared/buttons/ButtonDefault';
import SocialMediaLogin from './SocialMediaLogin';
//Import de media querys.
import { media } from '../../../const/mediaQuerys';
import useForm from '../../../hooks/useForm';
import useLanguage from '../../../hooks/useLanguage';

const SignUp = () => {
  //Estado que guarda el valor y validacion del input
  const [user, setUser] = useState({ success: null, value: '' });
  const [phone, setPhone] = useState({ success: null, value: '' });
  const [email, setEmail] = useState({ success: null, value: '' });
  const [password, setPassword] = useState({ success: null, value: '' });
  const { registerUser } = useForm();
  const { getText } = useLanguage();

  //Expresiones regulares usadas para validar los caracteres ingresados en el input
  const expressions = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  return (
    <Layout
      title="Registrarse"
      subtitle="Registrate y aumenta tu experiencia en la cocina con Foody+"
      center={true}
    >
      <StyledCont head>{getText('modal_user.register')}</StyledCont>

      <StyledSignUpContainer>
        <InputDefault
          tipo="text"
          name="user"
          placeholder={getText('register.user')}
          label={getText('register.user')}
          state={user}
          manageState={setUser}
          regExpression={expressions.user}
          errorMessage={'Solo se permiten letras, numeros, guion y guion bajo.'}
        />
        <InputDefault
          tipo="number"
          name="phone"
          placeholder="12 345678"
          label={getText('register.phone')}
          state={phone}
          manageState={setPhone}
          regExpression={expressions.phone}
          errorMessage={getText('register.phone_error')}
        />
        <InputDefault
          tipo="text"
          name="email"
          placeholder={getText('register.email_example')}
          label={getText('register.email')}
          state={email}
          manageState={setEmail}
          regExpression={expressions.email}
          errorMessage={getText('register.email_error')}
        />
        <InputDefault
          type="password"
          name="password"
          placeholder={getText('register.password')}
          label={getText('register.password')}
          state={password}
          manageState={setPassword}
          regExpression={expressions.password}
          errorMessage={getText('register.password_error')}
        />

        <ButtonDefault
          primary
          width="100%"
          height="48px"
          margin="20px 0 16px"
          disabled={
            !email.success ||
            !user.success ||
            !password.success ||
            !phone.success
          }
          onClick={() =>
            registerUser({
              email: email.value,
              username: user.value,
              password: password.value,
              phone: phone.value,
            })
          }
        >
          {getText('register.button')}
        </ButtonDefault>
      </StyledSignUpContainer>

      <StyledSeparator>
        <div></div>
        {/* <span>{innerWidth < 700 ? 'O' : 'O continuar con'}</span> */}
        <div></div>
      </StyledSeparator>

      <SocialMediaLogin />

      <StyledSignUp>
        {getText('register.dont_user')}
        <Link to="/login">{getText('register.login')}</Link>
      </StyledSignUp>
    </Layout>
  );
};

// =================== ESTILOS CSS ===================
const StyledSignUpContainer = styled.div`
  ${media.mobile} {
    max-width: 400px;
    width: 100%;
  }
  ${media.tab} {
    width: 400px;
  }
`;
const StyledForgot = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: 26px;
`;
const StyledCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 26px;
  margin: ${(props) => (props.head ? '1rem 0 1rem' : '')};

  ${media.tab} {
    margin: ${(props) => (props.head ? '4rem 0 2rem' : '')};
  }
`;
const StyledSignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 210px;
  width: 100%;
  height: 26px;

  a {
    color: var(--first-color);
  }
`;
const StyledSeparator = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem 1fr;
  align-items: center;
  justify-items: center;
  max-width: 400px;
  width: 100%;
  height: 26px;

  span {
    font-size: var(--small-font-size);
  }
  div {
    width: 100%;
    height: 2px;
    background-color: var(--light-gray);
  }

  ${media.tab} {
    grid-template-columns: 1fr 12rem 1fr;
  }
`;
export default SignUp;
