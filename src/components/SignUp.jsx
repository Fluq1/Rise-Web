import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineGoogle } from 'react-icons/ai';
import { registerWithEmailAndPassword, signInWithGoogle } from '/Users/heitor/Aulas LOCAL/BOER/macarrao-restaurant/src/FirebaseAuth.js';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [form, setForm] = useState({
    user: '',
    password: '',
    cpf: '',
    phone: '',
    cep: '',
    termsAgreed: false,
    privacyAgreed: false
  });

  const [errors, setErrors] = useState({});

  // Format functions
  const formatCPF = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Apply CPF format
    let formatted = digitsOnly;
    if (digitsOnly.length > 3) {
      formatted = digitsOnly.substring(0, 3) + '.' + digitsOnly.substring(3);
    }
    if (digitsOnly.length > 6) {
      formatted = formatted.substring(0, 7) + '.' + digitsOnly.substring(6);
    }
    if (digitsOnly.length > 9) {
      formatted = formatted.substring(0, 11) + '-' + digitsOnly.substring(9, 11);
    }
    
    // Limit to CPF length
    if (digitsOnly.length > 11) {
      formatted = formatted.substring(0, 14);
    }
    
    return formatted;
  };

  const formatPhone = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Apply phone format
    let formatted = digitsOnly;
    if (digitsOnly.length > 0) {
      formatted = '(' + digitsOnly.substring(0, 2);
    }
    if (digitsOnly.length > 2) {
      formatted = formatted + ') ' + digitsOnly.substring(2, 7);
    }
    if (digitsOnly.length > 7) {
      formatted = formatted + '-' + digitsOnly.substring(7, 11);
    }
    
    // Limit to phone length
    if (digitsOnly.length > 11) {
      formatted = formatted.substring(0, 15);
    }
    
    return formatted;
  };

  const formatCEP = (value) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Apply CEP format
    let formatted = digitsOnly;
    if (digitsOnly.length > 5) {
      formatted = digitsOnly.substring(0, 5) + '-' + digitsOnly.substring(5);
    }
    
    // Limit to CEP length
    if (digitsOnly.length > 8) {
      formatted = formatted.substring(0, 9);
    }
    
    return formatted;
  };

  // Validation functions
  const validateCPF = (cpf) => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };
  
  const validatePhone = (phone) => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(phone);
  };
  
  const validateCEP = (cep) => {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(cep);
  };

  // Handle input changes
  const handleCPFChange = (e) => {
    const formattedValue = formatCPF(e.target.value);
    setForm({ ...form, cpf: formattedValue });
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    setForm({ ...form, phone: formattedValue });
  };

  const handleCEPChange = (e) => {
    const formattedValue = formatCEP(e.target.value);
    setForm({ ...form, cep: formattedValue });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  const validateForm = () => {
    const newErrors = {
      user: !form.user ? 'Usuário obrigatório' : '',
      password: !form.password ? 'Senha obrigatória' : '',
      cpf: !validateCPF(form.cpf) ? 'CPF inválido' : '',
      phone: !validatePhone(form.phone) ? 'Telefone inválido' : '',
      cep: !validateCEP(form.cep) ? 'CEP inválido' : '',
      termsAgreed: !form.termsAgreed ? 'Você deve concordar com os Termos de Uso' : '',
      privacyAgreed: !form.privacyAgreed ? 'Você deve concordar com as Políticas de Privacidade' : ''
    };

    setErrors(newErrors);
    
    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        const result = await registerWithEmailAndPassword(form.user, form.password, form.user);
        
        if (result.success) {
          // Here you would typically save additional user information (CPF, phone, etc) to Firestore
          navigate('/dashboard');
        } else {
          setGeneralError('Erro ao criar conta: ' + result.error);
        }
      } catch (error) {
        setGeneralError('Erro ao criar conta. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignUp = async () => {
    if (!form.termsAgreed || !form.privacyAgreed) {
      setErrors({
        ...errors,
        termsAgreed: !form.termsAgreed ? 'Você deve concordar com os Termos de Uso' : '',
        privacyAgreed: !form.privacyAgreed ? 'Você deve concordar com as Políticas de Privacidade' : ''
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Here you would typically collect additional information after Google sign-in
        // Either redirect to a form to collect additional info or collect it here
        navigate('/dashboard');
      } else {
        setGeneralError('Falha ao registrar com Google: ' + result.error);
      }
    } catch (error) {
      setGeneralError('Falha ao registrar com Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="macOS-signup-container">
      <motion.div
        className="frosted-glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="apple-header">Criar Conta</h2>
        
        {generalError && (
          <div className="error-message" style={{ marginBottom: '1rem', color: 'red', textAlign: 'center' }}>
            {generalError}
          </div>
        )}

        {/* Google Sign Up Button */}
        <motion.button
          className="google-signup-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            color: '#444',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            gap: '10px'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignUp}
          disabled={isLoading}
        >
          <AiOutlineGoogle size={20} />
          <span>Cadastrar com Google</span>
        </motion.button>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '20px 0', 
          color: '#86868b',
          fontSize: '14px'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
          <span style={{ padding: '0 10px' }}>OU</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
        </div>

        {/* User */}
        <div className="input-group">
          <input
            className="macOS-input"
            placeholder="Usuário"
            value={form.user}
            onChange={(e) => setForm({...form, user: e.target.value})}
            disabled={isLoading}
          />
          {errors.user && <div className="error-bubble">{errors.user}</div>}
        </div>

        {/* Senha */}
        <div className="input-group">
          <input
            className="macOS-input"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            disabled={isLoading}
          />
          {errors.password && <div className="error-bubble">{errors.password}</div>}
        </div>

        {/* CPF */}
        <div className="input-group">
          <input
            className="macOS-input"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleCPFChange}
            maxLength={14}
            disabled={isLoading}
          />
          {errors.cpf && <div className="error-bubble">{errors.cpf}</div>}
        </div>

        {/* Telefone */}
        <div className="input-group">
          <input
            className="macOS-input"
            placeholder="Telefone"
            value={form.phone}
            onChange={handlePhoneChange}
            maxLength={15}
            disabled={isLoading}
          />
          {errors.phone && <div className="error-bubble">{errors.phone}</div>}
        </div>

        {/* CEP */}
        <div className="input-group">
          <input
            className="macOS-input"
            placeholder="CEP"
            value={form.cep}
            onChange={handleCEPChange}
            maxLength={9}
            disabled={isLoading}
          />
          {errors.cep && <div className="error-bubble">{errors.cep}</div>}
        </div>

        {/* Termos de Uso */}
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={form.termsAgreed}
              onChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <span className="checkbox-text">Concordo com os <a href="#" className="link">Termos de Uso</a></span>
          </label>
          {errors.termsAgreed && <div className="error-bubble">{errors.termsAgreed}</div>}
        </div>
        <br/>
        {/* Políticas de Privacidade */}
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="privacyAgreed"
              checked={form.privacyAgreed}
              onChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <span className="checkbox-text">Concordo com as <a href="#" className="link">Políticas de Privacidade</a></span>
          </label>
          {errors.privacyAgreed && <div className="error-bubble">{errors.privacyAgreed}</div>}
        </div>
        <br/>
        <motion.button
          className="macOS-primary-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Criando Conta...' : 'Criar Conta'}
        </motion.button>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/" style={{ color: '#007AFF', textDecoration: 'none' }}>
            Já tem uma conta? Faça login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;