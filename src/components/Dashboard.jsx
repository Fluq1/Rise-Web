import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaBox, 
  FaTrash, 
  FaLock, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaEye,
  FaSearch 
} from 'react-icons/fa';

// Componente para ícones personalizados
const Icon = ({ type }) => {
  switch (type) {
    case 'user':
      return <FaUser />;
    case 'box':
      return <FaBox />;
    case 'trash':
      return <FaTrash />;
    case 'lock':
      return <FaLock />;
    case 'map-pin':
      return <FaMapMarkerAlt />;
    case 'edit':
      return <FaEdit />;
    case 'eye':
      return <FaEye />;
    case 'search':
      return <FaSearch />;
    default:
      return null;
  }
};

// Componente para Badges
const Badge = ({ type, children }) => {
  const colors = {
    success: { bg: '#E3F9E5', text: '#34C759' },
    warning: { bg: '#FFF8E5', text: '#FF9500' },
    info: { bg: '#E5F6FF', text: '#007AFF' },
    danger: { bg: '#FFEEEE', text: '#FF3B30' },
  };
  
  const style = colors[type] || colors.info;
  
  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.text,
      padding: '0.25rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block'
    }}>
      {children}
    </span>
  );
};

// Componente para Card
const Card = ({ children, className = '', style = {} }) => {
  return (
    <motion.div
    className={`card ${className}`}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      ...style
    }}
    whileHover={{
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
      translateY: -2,
      transition: { duration: 0.3 }
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
      {children}
    </motion.div>
  );
};

// Componente para Botão
const Button = ({ children, onClick, variant = 'primary', size = 'medium', icon, className = '' }) => {
  const variants = {
    primary: { bg: '#007AFF', hover: '#0067DB', text: '#FFFFFF' },
    secondary: { bg: '#F2F2F7', hover: '#E5E5EA', text: '#3A3A3C' },
    danger: { bg: '#FF3B30', hover: '#E0352B', text: '#FFFFFF' },
    ghost: { bg: 'transparent', hover: 'rgba(0, 122, 255, 0.1)', text: '#007AFF', border: '1px solid #007AFF' },
    'ghost-danger': { bg: 'transparent', hover: 'rgba(255, 59, 48, 0.1)', text: '#FF3B30', border: '1px solid #FF3B30' }
  };

  const sizes = {
    small: { padding: '0.5rem 0.75rem', fontSize: '0.75rem' },  
    medium: { padding: '0.75rem 1rem', fontSize: '0.875rem' },
    large: { padding: '1rem 1.5rem', fontSize: '1rem' }
  };
  
  const style = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.medium;
  
  return (
    <motion.button
      className={`button ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border || 'none',
        borderRadius: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...sizeStyle
      }}
      whileHover={{ backgroundColor: style.hover, transform: 'translateY(-1px)' }}
      whileTap={{ transform: 'translateY(1px)' }}
      onClick={onClick}
    >
      {icon && <span className="button-icon" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </motion.button>
  );
};

// Componente para Input
const Input = ({ label, value, onChange, type = 'text', placeholder, icon }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {label && (
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontWeight: '500',
          fontSize: '0.875rem',
          color: '#6B7280'
        }}>
          {label}
        </label>
      )}
      <div style={{ 
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        {icon && (
          <div style={{ 
            position: 'absolute', 
            left: '1rem',
            display: 'flex',
            alignItems: 'center',
            color: '#6B7280'
          }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.875rem 1rem',
            paddingLeft: icon ? '2.5rem' : '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            fontSize: '0.875rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    </div>
  );
};

// Efeito de onda para cliques
const RippleEffect = () => {
  useEffect(() => {
    const ripple = (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.top = `${y}px`;
      ripple.style.left = `${x}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(button => {
      button.addEventListener('click', ripple);
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', ripple);
      });
    };
  }, []);
  
  return null;
};

// Componente Principal do Dashboard
function Dashboard() {
  // Estado para controlar qual menu está ativo
  const [activeMenu, setActiveMenu] = useState('minha-conta');
  
  // Dados do usuário
  const [userData, setUserData] = useState({
    username: 'heitor.fernandes', 
    email: 'heitor.fernandes@exemplo.com',
    cep: '01234-567',
    telefone: '(11) 98765-4321',
    dataCadastro: '10/05/2023',
    ultimoAcesso: '15/03/2025'
  });
  
// Simulação de pedidos
const [orders, setOrders] = useState([
  { 
    id: '#ORD-12345', 
    date: '10/03/2025', 
    status: 'Entregue', 
    items: [
      { nome: 'RISE Phone', quantidade: 1, preco: '1.899,90' },
      { nome: 'Capa Protetora RISE', quantidade: 1, preco: '89,90' }
    ],
    total: '1.989,80', 
    tracking: 'BR45678912345' 
  },
  { 
    id: '#ORD-12346', 
    date: '28/02/2025', 
    status: 'Em trânsito', 
    items: [
      { nome: 'Notebook RISE UltraSlim', quantidade: 1, preco: '4.599,90' },
      { nome: 'Mouse Bluetooth RISE', quantidade: 1, preco: '159,90' }
    ],
    total: '4.759,80',
    tracking: 'BR98765432109' 
  },
  { 
    id: '#ORD-12347', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12348', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12349', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12350', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12351', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12352', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12353', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12354', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12355', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12356', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12357', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12358', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12359', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12360', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12361', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  { 
    id: '#ORD-12362', 
    date: '15/01/2025', 
    status: 'Processando', 
    items: [
      { nome: 'Fones de Ouvido ProRise', quantidade: 1, preco: '799,90' },
      { nome: 'Carregador Rápido RISEMODE', quantidade: 2, preco: '129,90' }
    ],
    total: '1.059,70' 
  },
  {
    id: '#ORD-12363',
    date: '16/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Smartwatch PowerTrack', quantidade: 1, preco: '1.299,90' },
     { nome: 'Pulseira Extra', quantidade: 3, preco: '89,90' }
    ],
    total: '1.569,60'
   },
   
   {
    id: '#ORD-12364',
    date: '16/01/2025',
    status: 'Concluído',
    items: [
     { nome: 'Teclado Mecânico RiseTech', quantidade: 1, preco: '459,90' },
     { nome: 'Mouse Gamer UltraSpeed', quantidade: 1, preco: '329,90' },
     { nome: 'Mousepad XL', quantidade: 1, preco: '119,90' }
    ],
    total: '909,70'
   },
   
   {
    id: '#ORD-12365',
    date: '17/01/2025',
    status: 'Cancelado',
    items: [
     { nome: 'Câmera de Segurança 360°', quantidade: 2, preco: '599,90' }
    ],
    total: '1.199,80'
   },
   
   {
    id: '#ORD-12366',
    date: '17/01/2025',
    status: 'Processando',
    items: [
     { nome: 'Tablet RiseX Pro', quantidade: 1, preco: '2.799,90' },
     { nome: 'Capa Protetora', quantidade: 1, preco: '159,90' },
     { nome: 'Película de Vidro', quantidade: 1, preco: '89,90' }
    ],
    total: '3.049,70'
   },
   
   {
    id: '#ORD-12367',
    date: '18/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Caixa de Som Bluetooth', quantidade: 1, preco: '459,90' }
    ],
    total: '459,90'
   },
   
   {
    id: '#ORD-12368',
    date: '19/01/2025',
    status: 'Processando',
    items: [
     { nome: 'Notebook UltraSlim', quantidade: 1, preco: '5.499,90' },
     { nome: 'Mouse Sem Fio', quantidade: 1, preco: '199,90' },
     { nome: 'Adaptador USB-C', quantidade: 2, preco: '89,90' }
    ],
    total: '5.879,60'
   },
   
   {
    id: '#ORD-12369',
    date: '20/01/2025',
    status: 'Concluído',
    items: [
     { nome: 'Monitor 27" UltraWide', quantidade: 1, preco: '1.899,90' },
     { nome: 'Suporte Ergonômico', quantidade: 1, preco: '299,90' }
    ],
    total: '2.199,80'
   },
   
   {
    id: '#ORD-12370',
    date: '21/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Headset Gamer RGB', quantidade: 1, preco: '599,90' },
     { nome: 'Suporte para Headset', quantidade: 1, preco: '99,90' }
    ],
    total: '699,80'
   },
   
   {
    id: '#ORD-12371',
    date: '22/01/2025',
    status: 'Processando',
    items: [
     { nome: 'Impressora Multifuncional', quantidade: 1, preco: '1.299,90' },
     { nome: 'Cartucho Preto', quantidade: 2, preco: '129,90' },
     { nome: 'Cartucho Colorido', quantidade: 2, preco: '159,90' }
    ],
    total: '2.039,40'
   },
   
   {
    id: '#ORD-12372',
    date: '23/01/2025',
    status: 'Concluído',
    items: [
     { nome: 'Cadeira Gamer ProRise', quantidade: 1, preco: '1.799,90' }
    ],
    total: '1.799,90'
   },
   
   {
    id: '#ORD-12373',
    date: '24/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Webcam HD Pro', quantidade: 1, preco: '399,90' },
     { nome: 'Microfone Condensador', quantidade: 1, preco: '499,90' }
    ],
    total: '899,80'
   },
   
   {
    id: '#ORD-12374',
    date: '25/01/2025',
    status: 'Processando',
    items: [
     { nome: 'Smartphone RisePhone X', quantidade: 1, preco: '3.999,90' },
     { nome: 'Capinha Anti-Impacto', quantidade: 1, preco: '129,90' },
     { nome: 'Carregador Sem Fio', quantidade: 1, preco: '249,90' }
    ],
    total: '4.379,70'
   },
   
   {
    id: '#ORD-12375',
    date: '26/01/2025',
    status: 'Cancelado',
    items: [
     { nome: 'Smart TV 55" 4K', quantidade: 1, preco: '3.499,90' },
     { nome: 'Suporte de Parede', quantidade: 1, preco: '259,90' }
    ],
    total: '3.759,80'
   },
   
   {
    id: '#ORD-12376',
    date: '27/01/2025',
    status: 'Concluído',
    items: [
     { nome: 'Fritadeira Elétrica Digital', quantidade: 1, preco: '599,90' }
    ],
    total: '599,90'
   },
   
   {
    id: '#ORD-12377',
    date: '28/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Aspirador Robô Smart', quantidade: 1, preco: '1.999,90' },
     { nome: 'Filtro Extra', quantidade: 2, preco: '129,90' }
    ],
    total: '2.259,70'
   },
   
   {
    id: '#ORD-12378',
    date: '29/01/2025',
    status: 'Processando',
    items: [
     { nome: 'Console de Games Pro', quantidade: 1, preco: '4.499,90' },
     { nome: 'Controle Extra', quantidade: 1, preco: '399,90' },
     { nome: 'Jogo Digital Premium', quantidade: 2, preco: '299,90' }
    ],
    total: '5.499,60'
   },
   
   {
    id: '#ORD-12379',
    date: '30/01/2025',
    status: 'Concluído',
    items: [
     { nome: 'Dock Station 12-em-1', quantidade: 1, preco: '599,90' }
    ],
    total: '599,90'
   },
   
   {
    id: '#ORD-12380',
    date: '31/01/2025',
    status: 'Enviado',
    items: [
     { nome: 'Câmera Fotográfica DSLR', quantidade: 1, preco: '3.999,90' },
     { nome: 'Lente 50mm', quantidade: 1, preco: '1.299,90' },
     { nome: 'Cartão SD 128GB', quantidade: 2, preco: '199,90' }
    ],
    total: '5.699,60'
   },
   
   {
    id: '#ORD-12381',
    date: '01/02/2025',
    status: 'Processando',
    items: [
     { nome: 'SSD 1TB NVMe', quantidade: 1, preco: '899,90' },
     { nome: 'Case Externa SSD', quantidade: 1, preco: '149,90' }
    ],
    total: '1.049,80'
   },
   
   {
    id: '#ORD-12382',
    date: '02/02/2025',
    status: 'Cancelado',
    items: [
     { nome: 'Drone 4K Premium', quantidade: 1, preco: '4.999,90' },
     { nome: 'Bateria Extra', quantidade: 2, preco: '599,90' }
    ],
    total: '6.199,70'
   },
   
   {
    id: '#ORD-12383',
    date: '03/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Projetor Smart 4K', quantidade: 1, preco: '2.899,90' },
     { nome: 'Tela de Projeção 100"', quantidade: 1, preco: '499,90' }
    ],
    total: '3.399,80'
   },
   
   {
    id: '#ORD-12384',
    date: '04/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Relógio Inteligente Sport', quantidade: 1, preco: '999,90' }
    ],
    total: '999,90'
   },
   
   {
    id: '#ORD-12385',
    date: '05/02/2025',
    status: 'Processando',
    items: [
     { nome: 'Fones de Ouvido True Wireless', quantidade: 1, preco: '899,90' },
     { nome: 'Case de Carregamento Extra', quantidade: 1, preco: '199,90' }
    ],
    total: '1.099,80'
   },
   
   {
    id: '#ORD-12386',
    date: '06/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Hub USB-C 8 Portas', quantidade: 1, preco: '399,90' }
    ],
    total: '399,90'
   },
   
   {
    id: '#ORD-12387',
    date: '07/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Teclado e Mouse Wireless', quantidade: 1, preco: '599,90' },
     { nome: 'Apoio de Pulso Ergonômico', quantidade: 1, preco: '129,90' }
    ],
    total: '729,80'
   },
   
   {
    id: '#ORD-12388',
    date: '08/02/2025',
    status: 'Processando',
    items: [
     { nome: 'Máquina de Café Automática', quantidade: 1, preco: '2.499,90' },
     { nome: 'Kit Cápsulas Premium', quantidade: 2, preco: '159,90' }
    ],
    total: '2.819,70'
   },
   
   {
    id: '#ORD-12389',
    date: '09/02/2025',
    status: 'Cancelado',
    items: [
     { nome: 'Ar Condicionado Inverter', quantidade: 1, preco: '3.299,90' },
     { nome: 'Instalação Básica', quantidade: 1, preco: '599,90' }
    ],
    total: '3.899,80'
   },
   
   {
    id: '#ORD-12390',
    date: '10/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Caixa de Som Portátil', quantidade: 1, preco: '499,90' },
     { nome: 'Bateria Portátil 20000mAh', quantidade: 1, preco: '399,90' }
    ],
    total: '899,80'
   },
   
   {
    id: '#ORD-12391',
    date: '11/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Monitor Gamer 144Hz', quantidade: 1, preco: '1.799,90' },
     { nome: 'Cabo HDMI 2.1', quantidade: 1, preco: '129,90' }
    ],
    total: '1.929,80'
   },
   
   {
    id: '#ORD-12392',
    date: '12/02/2025',
    status: 'Processando',
    items: [
     { nome: 'Placa de Vídeo 12GB', quantidade: 1, preco: '5.499,90' }
    ],
    total: '5.499,90'
   },
   
   {
    id: '#ORD-12393',
    date: '13/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Router Mesh Wi-Fi 6', quantidade: 1, preco: '1.299,90' },
     { nome: 'Extensor de Sinal', quantidade: 2, preco: '499,90' }
    ],
    total: '2.299,70'
   },
   
   {
    id: '#ORD-12394',
    date: '14/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Impressora 3D Compacta', quantidade: 1, preco: '2.999,90' },
     { nome: 'Filamento PLA Premium', quantidade: 3, preco: '199,90' }
    ],
    total: '3.599,60'
   },
   
   {
    id: '#ORD-12395',
    date: '15/02/2025',
    status: 'Processando',
    items: [
     { nome: 'Purificador de Ar Digital', quantidade: 1, preco: '1.499,90' },
     { nome: 'Filtro HEPA Extra', quantidade: 1, preco: '299,90' }
    ],
    total: '1.799,80'
   },
   
   {
    id: '#ORD-12396',
    date: '16/02/2025',
    status: 'Cancelado',
    items: [
     { nome: 'Smart Speaker Premium', quantidade: 2, preco: '799,90' }
    ],
    total: '1.599,80'
   },
   
   {
    id: '#ORD-12397',
    date: '17/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Kit Smart Home Básico', quantidade: 1, preco: '1.999,90' },
     { nome: 'Sensor de Movimento', quantidade: 3, preco: '159,90' }
    ],
    total: '2.479,60'
   },
   
   {
    id: '#ORD-12398',
    date: '18/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Cooler para Notebook', quantidade: 1, preco: '299,90' }
    ],
    total: '299,90'
   },
   
   {
    id: '#ORD-12399',
    date: '19/02/2025',
    status: 'Processando',
    items: [
     { nome: 'HD Externo 5TB', quantidade: 1, preco: '899,90' },
     { nome: 'Cabo USB 3.0', quantidade: 1, preco: '69,90' }
    ],
    total: '969,80'
   },
   
   {
    id: '#ORD-12400',
    date: '20/02/2025',
    status: 'Concluído',
    items: [
     { nome: 'Pen Drive 256GB', quantidade: 3, preco: '179,90' },
     { nome: 'Adaptador OTG', quantidade: 1, preco: '49,90' }
    ],
    total: '589,60'
   },
   
   {
    id: '#ORD-12401',
    date: '21/02/2025',
    status: 'Enviado',
    items: [
     { nome: 'Processador High-End', quantidade: 1, preco: '2.799,90' },
     { nome: 'Pasta Térmica Premium', quantidade: 1, preco: '99,90' }
    ],
    total: '2.899,80'
   },
   
   {
    id: '#ORD-12402',
    date: '22/02/2025',
    status: 'Processando',
    items: [
     { nome: 'Kit Teclado, Mouse e Headset Gamer', quantidade: 1, preco: '999,90' }
    ],
    total: '999,90'
   }  
]);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);
const [searchTerm, setSearchTerm] = useState('');

// Estado para controlar o modal de cadastro de itens
const [isModalOpen, setIsModalOpen] = useState(false);
const [newItem, setNewItem] = useState({
  nome: '',
  quantidade: 1,
  preco: '',
  pedidoId: ''
});

// Função para abrir o modal
const openModal = () => {
  setIsModalOpen(true);
};

// Função para fechar o modal
const closeModal = () => {
  setIsModalOpen(false);
  setNewItem({
    nome: '',
    quantidade: 1,
    preco: '',
    pedidoId: ''
  });
};

// Função para formatar o preço
const formatPrice = (value) => {
  // Remove todos os caracteres não numéricos
  const digitsOnly = value.replace(/\D/g, '');
  
  // Converte para número e divide por 100 para obter o valor em reais
  const numericValue = parseInt(digitsOnly, 10) / 100;
  
  // Formata o número para o formato brasileiro
  return numericValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Função para lidar com mudanças no campo de preço
const handlePriceChange = (e) => {
  const formattedValue = formatPrice(e.target.value);
  setNewItem({
    ...newItem,
    preco: formattedValue
  });
};

// Função para adicionar o novo item
const handleAddItem = () => {
  // Validação básica
  if (!newItem.nome || !newItem.preco || !newItem.pedidoId) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  // Encontra o pedido correspondente
  const updatedOrders = orders.map(order => {
    if (order.id === newItem.pedidoId) {
      // Adiciona o novo item à lista de itens do pedido
      const updatedItems = [...order.items, {
        nome: newItem.nome,
        quantidade: parseInt(newItem.quantidade, 10),
        preco: newItem.preco
      }];
      
      // Recalcula o total do pedido
      const total = updatedItems.reduce((sum, item) => {
        const precoNumerico = parseFloat(item.preco.replace('.', '').replace(',', '.')) * item.quantidade;
        return sum + precoNumerico;
      }, 0);
      
      // Formata o total para o formato brasileiro
      const formattedTotal = total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      return {
        ...order,
        items: updatedItems,
        total: formattedTotal
      };
    }
    return order;
  });
  
  // Atualiza o estado dos pedidos
  setOrders(updatedOrders);
  
  // Fecha o modal e limpa o formulário
  closeModal();
};
// Filtra e pagina os pedidos
const filteredOrders = orders.filter(order => 
  order.id.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1); // Resetar para a primeira página ao pesquisar
};

const handleItemsPerPageChange = (e) => {
  setItemsPerPage(Number(e.target.value));
  setCurrentPage(1);
};

const [selectedOrder, setSelectedOrder] = useState(null);
const [showOrderDetails, setShowOrderDetails] = useState(false);
const [isEditingProfile, setIsEditingProfile] = useState(false);
const [editedUserData, setEditedUserData] = useState({...userData});
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [passwordData, setPasswordData] = useState({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Funções para gerenciar dados do usuário
const handleEditProfile = () => {
  setIsEditingProfile(true);
  setEditedUserData({...userData});
};

const handleCancelEdit = () => {
  setIsEditingProfile(false);
};

const handleSaveProfile = () => {
  setUserData({...editedUserData});
  setIsEditingProfile(false);
  
  // Simular feedback de sucesso
  alert("Perfil atualizado com sucesso!");
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (isEditingProfile) {
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  } else {
    setNewItem({
      ...newItem,
      [name]: value
    });
  }
};

// Função para alterar senha
const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData({
    ...passwordData,
    [name]: value
  });
};

const handleChangePassword = () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  
  // Simular mudança de senha
  setShowPasswordModal(false);
  setPasswordData({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  alert("Senha alterada com sucesso!");
};

// Função para ver detalhes do pedido
const handleViewOrderDetails = (order) => {
  setSelectedOrder(order);
  setShowOrderDetails(true);
};

const handleCloseOrderDetails = () => {
  setShowOrderDetails(false);
  setSelectedOrder(null);
};

// Função para deletar conta
const handleDeleteAccount = () => {
  const confirmation = window.confirm("Esta ação não pode ser desfeita. Todos os seus dados serão excluídos permanentemente. Tem certeza?");
  
  if (confirmation) {
    // Simular exclusão
    alert("Conta excluída com sucesso. Redirecionando para a página inicial...");
  }
};

// Efeito para animação de entrada
useEffect(() => {
  // Adicionar classe ao body para estilos globais
  document.body.classList.add('dashboard-active');
  
  return () => {
    document.body.classList.remove('dashboard-active');
  };
}, []);

// Função para obter o ícone correto para o status
const getStatusBadge = (status) => {
  switch (status) {
    case 'Entregue':
      return <Badge type="success">Entregue</Badge>;
    case 'Em trânsito':
      return <Badge type="info">Em trânsito</Badge>;
    case 'Processando':
      return <Badge type="warning">Processando</Badge>;
    case 'Cancelado':
      return <Badge type="danger">Cancelado</Badge>;
    default:
      return <Badge type="info">{status}</Badge>;
  }
};

// Função para renderizar o modal de senha
const renderPasswordModal = () => {
  if (!showPasswordModal) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Alteração de Senha</h3>
        
        <Input
          label="Senha Atual"
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          icon={<Icon type="lock" />}
        />
        
        <Input
          label="Nova Senha"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          icon={<Icon type="lock" />}
        />
        
        <Input
          label="Confirmar Nova Senha"
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          icon={<Icon type="lock" />}
        />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowPasswordModal(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary"

            onClick={handleChangePassword}
          >
            Confirmar
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Função para renderizar os detalhes do pedido
const renderOrderDetails = () => {
  if (!showOrderDetails || !selectedOrder) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          width: '90%',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>Detalhes do Pedido {selectedOrder.id}</h3>
          <Button 
            variant="secondary" 
            size="small"
            onClick={handleCloseOrderDetails}
          >
            Fechar
          </Button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <p style={{ margin: '0.25rem 0', color: '#6B7280' }}>Data: <strong>{selectedOrder.date}</strong></p>
            <p style={{ margin: '0.25rem 0', color: '#6B7280' }}>Status: {getStatusBadge(selectedOrder.status)}</p>
          </div>
          {selectedOrder.tracking && (
            <div>
              <p style={{ margin: '0.25rem 0', color: '#6B7280' }}>Rastreamento: <strong>{selectedOrder.tracking}</strong></p>
            </div>
          )}
        </div>
        
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.03)', 
          borderRadius: '12px', 
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Itens</h4>
          {selectedOrder.items.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '0.75rem 0',
                borderBottom: index < selectedOrder.items.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none'
              }}
            >
              <div>
                <p style={{ margin: '0', fontWeight: '500' }}>{item.nome}</p>
                <p style={{ margin: '0', color: '#6B7280', fontSize: '0.875rem' }}>Quantidade: {item.quantidade}</p>
              </div>
              <p style={{ margin: '0', fontWeight: '500' }}>R$ {item.preco}</p>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>Total: R$ {selectedOrder.total}</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <Button 
            variant="primary"
            icon={<Icon type="box" />}
          >
            Rastrear Pedido
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// Função para renderizar o conteúdo baseado no menu ativo
const renderContent = () => {
  switch (activeMenu) {
    case 'minha-conta':
      return (
<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key="minha-conta"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Minha Conta</h2>
              {!isEditingProfile && (
                <Button 
                  variant="ghost" 
                  size="small"
                  onClick={handleEditProfile}
                  icon={<Icon type="edit" />}
                >
                  Editar Perfil
                </Button>
              )}
            </div>
            
            {isEditingProfile ? (
              <Card>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Editar Informações</h3>
                
                <Input
                  label="Nome de Usuário"
                  name="username"
                  value={editedUserData.username}
                  onChange={handleInputChange}
                  icon={<Icon type="user" />}
                />
                
                <Input
                  label="E-mail"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  type="email"
                />
                
                <Input
                  label="CEP"
                  name="cep"
                  value={editedUserData.cep}
                  onChange={handleInputChange}
                  icon={<Icon type="map-pin" />}
                />
                
                <Input
                  label="Telefone"
                  name="telefone"
                  value={editedUserData.telefone}
                  onChange={handleInputChange}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <Button 
                    variant="secondary" 
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={handleSaveProfile}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <Card>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '50%', 
                      backgroundColor: '#E5F6FF', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#007AFF',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginRight: '1rem'
                    }}>
                      {userData.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>{userData.username}</h3>
                      <p style={{ margin: '0.25rem 0 0', color: '#6B7280' }}>{userData.email}</p>
                    </div>
                  </div>
                  
                  <div style={{ 
                    borderTop: '1px solid rgba(0,0,0,0.1)', 
                    paddingTop: '1rem',
                    marginTop: '0.5rem'
                 }}>
                   <p style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#6B7280' }}>Telefone:</span>
                     <span>{userData.telefone}</span>
                   </p>
                   <p style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#6B7280' }}>CEP:</span>
                     <span>{userData.cep}</span>
                   </p>
                   <p style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#6B7280' }}>Data de cadastro:</span>
                     <span>{userData.dataCadastro}</span>
                   </p>
                   <p style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: '#6B7280' }}>Último acesso:</span>
                     <span>{userData.ultimoAcesso}</span>
                   </p>
                 </div>
               </Card>
               
               <Card>
                 <h3 style={{ marginTop: 0 }}>Segurança</h3>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div>
                     <p style={{ margin: '0.5rem 0', fontWeight: '500' }}>Senha</p>
                     <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.875rem' }}>Mantenha sua conta segura com uma senha forte</p>
                   </div>
                   <Button 
                     variant="ghost" 
                     size="small"
                     onClick={() => setShowPasswordModal(true)}
                   >
                     Alterar senha
                   </Button>
                 </div>
               </Card>
             </>
           )}
         </motion.div>
       </AnimatePresence>
     );
   
     case 'meus-pedidos':
      return (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key="meus-pedidos"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Meus Pedidos</h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={openModal}
                  icon={<span>+</span>}
                >
                  Adicionar Item
                </Button>
                <Input
                  placeholder="Pesquisar por ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ width: '200px' }}
                  icon={<Icon type="search" />}
                />
                <select 
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    backgroundColor: 'white'
                  }}
                >
                  <option value={5}>5 itens</option>
                  <option value={10}>10 itens</option>
                  <option value={15}>15 itens</option>
                </select>
              </div>
            </div>
    
            {currentOrders.length === 0 ? (
              <Card style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ 
                  backgroundColor: 'rgba(0, 122, 255, 0.1)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <Icon type="box" />
                </div>
                <h3>Nenhum pedido encontrado</h3>
                <p style={{ color: '#6B7280', maxWidth: '400px', margin: '0 auto' }}>
                  {searchTerm ? 'Nenhum pedido corresponde à sua pesquisa.' : 'Você ainda não fez nenhum pedido. Explore nossa loja e encontre produtos incríveis!'}
                </p>
                <Button 
                  variant="primary"
                  style={{ marginTop: '1.5rem' }}
                >
                  Ir para a loja
                </Button>
              </Card>
            ) : (
              <>
                {currentOrders.map((order, index) => (
                  <Card key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem' }}>{order.id}</h4>
                        <p style={{ margin: '0.25rem 0', color: '#6B7280', fontSize: '0.875rem' }}>Data: {order.date}</p>
                        <div style={{ marginTop: '0.5rem' }}>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0', fontWeight: '600' }}>R$ {order.total}</p>
                        <Button 
                          variant="ghost" 
                          size="small"
                          onClick={() => handleViewOrderDetails(order)}
                          icon={<Icon type="eye" />}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
    
            {filteredOrders.length > 0 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                marginTop: '2rem',
                alignItems: 'center'
              }}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
    
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setCurrentPage(page)}
                    style={{ minWidth: '40px' }}
                  >
                    {page}
                  </Button>
                ))}
    
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      );

   case 'deletar-conta':
     return (
       <AnimatePresence mode="wait" initial={false}>
         <motion.div
           key="deletar-conta"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.4 }}
         >
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h2 style={{ margin: 0 }}>Deletar Conta</h2>
           </div>
           
           <Card>
             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
               <div style={{ 
                 width: '48px', 
                 height: '48px', 
                 borderRadius: '50%', 
                 backgroundColor: 'rgba(255, 59, 48, 0.1)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 color: '#FF3B30',
                 marginRight: '1rem'
               }}>
                 <Icon type="trash" />
               </div>
               <div>
                 <h3 style={{ margin: 0 }}>Excluir minha conta</h3>
                 <p style={{ margin: '0.25rem 0 0', color: '#6B7280' }}>Esta ação não pode ser desfeita</p>
               </div>
             </div>
             
             <div style={{ backgroundColor: 'rgba(255, 59, 48, 0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
               <p style={{ margin: '0 0 0.5rem', fontWeight: '500', color: '#FF3B30' }}>Atenção:</p>
               <ul style={{ margin: '0', paddingLeft: '1.5rem', color: '#6B7280' }}>
                 <li style={{ marginBottom: '0.5rem' }}>Todos os seus dados pessoais serão removidos permanentemente</li>
                 <li style={{ marginBottom: '0.5rem' }}>Seu histórico de pedidos será apagado</li>
                 <li>Você perderá acesso a quaisquer serviços associados à sua conta</li>
               </ul>
             </div>
             
             <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
               Para confirmar a exclusão da sua conta, clique no botão abaixo. 
               Esta ação não pode ser revertida.
             </p>
             
             <div style={{ textAlign: 'center' }}>
               <Button 
                 variant="danger"
                 icon={<Icon type="trash" />}
                 onClick={handleDeleteAccount}
               >
                 Excluir minha conta permanentemente
               </Button>
             </div>
           </Card>
         </motion.div>
       </AnimatePresence>
     );
   
   default:
     return <div>Selecione uma opção no menu</div>;
 }
};

// Componente do Modal
const ItemModal = () => {
  if (!isModalOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <motion.div
        className="frosted-glass-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          width: '450px',
          padding: '2rem',
          borderRadius: '18px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Adicionar Novo Item</h2>
          <Button 
            variant="secondary" 
            size="small" 
            onClick={closeModal}
            style={{ padding: '0.5rem', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            ✕
          </Button>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#6B7280' }}>
            Pedido
          </label>
          <select
            name="pedidoId"
            value={newItem.pedidoId}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              outline: 'none'
            }}
          >
            <option value="">Selecione um pedido</option>
            {orders.map(order => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.date}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#6B7280' }}>
            Nome do Item
          </label>
          <input
            type="text"
            name="nome"
            value={newItem.nome}
            onChange={handleInputChange}
            placeholder="Ex: Camiseta RISE"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#6B7280' }}>
              Quantidade
            </label>
            <input
              type="number"
              name="quantidade"
              value={newItem.quantidade}
              onChange={handleInputChange}
              min="1"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ flex: 2 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: '#6B7280' }}>
              Preço (R$)
            </label>
            <input
              type="text"
              name="preco"
              value={newItem.preco}
              onChange={handlePriceChange}
              placeholder="0,00"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button
            variant="ghost"
            onClick={closeModal}
            style={{ flex: 1 }}
          >
            Cancelar
          </Button>
          
          <Button
            variant="primary"
            onClick={handleAddItem}
            style={{ flex: 2 }}
          >
            Adicionar Item
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

return (
 <>
   <RippleEffect />
   
   <div className="dashboard-container" style={{
     display: 'grid',
     gridTemplateColumns: 'minmax(250px, 1fr) 3fr',
     gap: '1.5rem',
     minHeight: '100vh',
     padding: '1.5rem',
     backgroundColor: '#f5f7fa',
     backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(240,242,250,0.8))'
   }}>
     <div className="sidebar frosted-glass" style={{
       backgroundColor: 'rgba(255, 255, 255, 0.7)',
       backdropFilter: 'blur(10px)',
       borderRadius: '16px',
       padding: '1.5rem',
       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
       border: '1px solid rgba(255, 255, 255, 0.18)',
       height: 'fit-content',
       position: 'sticky',
       top: '1.5rem'
     }}>
       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
         <div style={{ 
           width: '48px', 
           height: '48px', 
           borderRadius: '12px', 
           background: 'linear-gradient(135deg, #007AFF, #00C7FF)', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center',
           color: 'white',
           fontWeight: 'bold',
           fontSize: '1.25rem',
           marginRight: '1rem'
         }}>
           C
         </div>
         <div>
           <h3 style={{ margin: '0' }}>Central do Cliente</h3>
         </div>
       </div>
       
       <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
<motion.button 
  className={`menu-item ripple ${activeMenu === 'minha-conta' ? 'active' : ''}`}
  initial={false}
  whileHover={{ x: 4, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.98 }}
  style={{ 
    padding: '1rem', 
    borderRadius: '12px', 
    border: 'none', 
    cursor: 'pointer',
    backgroundColor: activeMenu === 'minha-conta' ? 'rgba(0,122,255,0.1)' : 'transparent',
    color: activeMenu === 'minha-conta' ? '#007AFF' : '#1F2937',
    textAlign: 'left',
    fontWeight: activeMenu === 'minha-conta' ? '600' : '400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }}
  onClick={() => setActiveMenu('minha-conta')}
>
           <Icon type="user" />
           Minha Conta
         </motion.button>
         
         <motion.button 
           className={`menu-item ripple ${activeMenu === 'meus-pedidos' ? 'active' : ''}`}
           whileHover={{ x: 4 }}
           whileTap={{ scale: 0.98 }}
           style={{ 
             padding: '1rem', 
             borderRadius: '12px', 
             border: 'none', 
             cursor: 'pointer',
             backgroundColor: activeMenu === 'meus-pedidos' ? 'rgba(0,122,255,0.1)' : 'transparent',
             color: activeMenu === 'meus-pedidos' ? '#007AFF' : '#1F2937',
             textAlign: 'left',
             fontWeight: activeMenu === 'meus-pedidos' ? '600' : '400',
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             transition: 'all 0.2s ease',
             position: 'relative',
             overflow: 'hidden'
           }}
           onClick={() => setActiveMenu('meus-pedidos')}
         >
           <Icon type="box" />
           Meus Pedidos
         </motion.button>
         
         <div style={{ margin: '0.5rem 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}></div>
         
         <motion.button 
           className={`menu-item ripple ${activeMenu === 'deletar-conta' ? 'active' : ''}`}
           whileHover={{ x: 4 }}
           whileTap={{ scale: 0.98 }}
           style={{ 
             padding: '1rem', 
             borderRadius: '12px', 
             border: 'none', 
             cursor: 'pointer',
             backgroundColor: activeMenu === 'deletar-conta' ? 'rgba(255,59,48,0.1)' : 'transparent',
             color: activeMenu === 'deletar-conta' ? '#FF3B30' : '#1F2937',
             textAlign: 'left',
             fontWeight: activeMenu === 'deletar-conta' ? '600' : '400',
             display: 'flex',
             alignItems: 'center',
             gap: '0.75rem',
             transition: 'all 0.2s ease',
             position: 'relative',
             overflow: 'hidden'
           }}
           onClick={() => setActiveMenu('deletar-conta')}
         >
           <Icon type="trash" />
           Deletar Conta
         </motion.button>
       </nav>
     </div>

     <div className="content frosted-glass" style={{
       backgroundColor: 'rgba(255, 255, 255, 0.7)',
       backdropFilter: 'blur(10px)',
       borderRadius: '16px',
       padding: '2rem',
       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
       border: '1px solid rgba(255, 255, 255, 0.18)',
       minHeight: '500px'
     }}>
       {renderContent()}
     </div>
   </div>
   
   {showPasswordModal && renderPasswordModal()}
   {showOrderDetails && renderOrderDetails()}
   {isModalOpen && <ItemModal />}
   
   <style jsx global>{`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
     
     * {
       box-sizing: border-box;
       font-family: 'Inter', sans-serif;
     }
     
     body {
       margin: 0;
       padding: 0;
       background-color: #f5f7fa;
     }
     
.ripple-effect {
       position: absolute;
       border-radius: 50%;
       background-color: rgba(255, 255, 255, 0.7);
       width: 100px;
       height: 100px;
       transform: scale(0);
       animation: ripple 0.6s linear;
       pointer-events: none;
     }
     
     @keyframes ripple {
       to {
         transform: scale(4);
         opacity: 0;
       }
     }
     
     .dashboard-active {
       background-color: #f5f7fa;
       background-image: linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(240,242,250,0.8));
     }
     
     .frosted-glass {
       transition: transform 0.3s ease, box-shadow 0.3s ease;
     }
     
     .frosted-glass:hover {
       box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
     }
     
     input:focus {
       outline: none;
       border-color: #007AFF;
       box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
     }
     
     button {
       position: relative;
       overflow: hidden;
     }
     
     h1, h2, h3, h4, h5, h6 {
       color: #1F2937;
     }
     
     .menu-item.active {
       font-weight: 600;
     }
     
     @media (max-width: 768px) {
       .dashboard-container {
         grid-template-columns: 1fr;
       }
       
       .sidebar {
         position: static;
         margin-bottom: 1rem;
       }
     }
   `}</style>
 </>
);
}

export default Dashboard;