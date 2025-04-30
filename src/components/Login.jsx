import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineLock, AiOutlineGoogle } from 'react-icons/ai';
import { loginWithEmailAndPassword, signInWithGoogle } from '/Users/heitor/Aulas LOCAL/BOER/macarrao-restaurant/src/FirebaseAuth.js';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const FormCard = styled(motion.div)`
  width: 380px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.8);
  
  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #86868b;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background: #0063CC;
  }
`;

const GoogleButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: white;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background: #f2f2f2;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  span {
    padding: 0 10px;
    color: #86868b;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff3b30;
  font-size: 14px;
  margin-top: 0.5rem;
`;

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!credentials.user.trim()) {
      newErrors.user = 'Usuário obrigatório';
    } else if (credentials.user.length < 6) {
      newErrors.user = 'Usuário deve ter pelo menos 6 caracteres';
    }

    // Password validation
    if (!credentials.password.trim()) {
      newErrors.password = 'Senha obrigatória';
    } else {
      const missingRequirements = [];
      if (!/[a-z]/.test(credentials.password)) missingRequirements.push('uma letra minúscula');
      if (!/[A-Z]/.test(credentials.password)) missingRequirements.push('uma letra maiúscula');
      if (!/[0-9]/.test(credentials.password)) missingRequirements.push('um número');
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(credentials.password)) {
        missingRequirements.push('um caractere especial');
      }

      if (missingRequirements.length > 0) {
        newErrors.password = `A senha deve conter ${missingRequirements.join(', ')}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        const result = await loginWithEmailAndPassword(credentials.user, credentials.password);
        
        if (result.success) {
          navigate('/dashboard');
        } else {
          setErrors({ general: 'Usuário ou senha incorretos' });
        }
      } catch (error) {
        setErrors({ general: 'Falha no login. Verifique suas credenciais.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Falha ao entrar com Google. Tente novamente.' });
      }
    } catch (error) {
      setErrors({ general: 'Falha ao entrar com Google. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormCard
        className="frosted-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={{ marginBottom: '2rem', fontWeight: '600' }}>Bem-vindo de Volta</h2>
        
        {errors.general && <ErrorMessage style={{ marginBottom: '1rem' }}>{errors.general}</ErrorMessage>}
        
        <GoogleButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <AiOutlineGoogle size={20} />
          <span>Entrar com Google</span>
        </GoogleButton>
        
        <Divider>
          <span>OU</span>
        </Divider>
        
        <InputContainer>
          <Icon><AiOutlineUser size={20} /></Icon>
          <Input
            placeholder="Usuário"
            value={credentials.user}
            onChange={(e) => setCredentials({...credentials, user: e.target.value})}
            disabled={isLoading}
          />
          {errors.user && <ErrorMessage>{errors.user}</ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <Icon><AiOutlineLock size={20} /></Icon>
          <Input
            type="password"
            placeholder="Senha"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            disabled={isLoading}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputContainer>

        <Button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/signup" style={{ color: '#007AFF', textDecoration: 'none' }}>
            Não tem uma conta? Cadastre-se
          </a>
        </div>
      </FormCard>
    </Container>
  );
}

export default Login;