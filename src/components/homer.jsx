import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from '../styles/styles.css';
import CamisetaImage from '../images/Camiseta.png'; // Import the image
import CanecaImage from '../images/Caneca.png'; // Import the image
import BoneImage from '../images/Bone.png';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ user: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!credentials.user) newErrors.user = 'Usuário obrigatório';
        if (!credentials.password) newErrors.password = 'Senha obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="login-container">
            {/* Menu 1 */}
            <motion.div
                className="login-form-card frosted-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <img
                    className="camisa"
                    src={CamisetaImage} // Use the imported image
                    alt="Camiseta"
                />
                <br />
                <br />
                <h1>Novo Lançamento</h1>
                <br />
                <motion.button
                    className="login-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                >
                    Descubra Mais
                </motion.button>
            </motion.div>

            {/* Menu 2 */}
            <motion.div
                className="login-form-card frosted-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <img
                    className="camisa"
                    src={CanecaImage} // Use the imported image
                    alt="Caneca"
                />
                <br />
                <br />
                <h1>Coleção de Canecas</h1>
                <br />
                <motion.button
                    className="login-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                >
                    Descubra Mais
                </motion.button>
            </motion.div>

            {/* Menu 3 */}
            <motion.div
                className="login-form-card frosted-glass"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <img
                    className="camisa"
                    src={BoneImage} // Use the imported image
                    alt="Boné"
                />
                <br />
                <br />
                <h1>Bonés Exclusivos</h1>
                <br />
                <motion.button
                    className="login-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogin}
                >
                    Descubra Mais
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Login;