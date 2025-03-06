import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import backendApi from "../services/backendApi";
import styles from "../styles/login.module.css"; 

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [PasswordData, setPasswordData] = useState({
         password: "", 
         confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleResetPasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();  // Agora a função tem acesso ao evento

        if (PasswordData.password !== PasswordData.confirmPassword) {
            setMessage("As senhas não coincidem.");
            return;
        }

        const newPassword = PasswordData.password;

        try {
            await backendApi.post("/usuario/reset-password/confirm", { token, newPassword });
            setMessage("Senha redefinida com sucesso!");
        } catch (error) {
            setMessage("Erro ao redefinir senha. O token pode ter expirado.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.bookSpace} ${styles.book}`}>
                <div className={styles.page}>
                    <header></header>
                    <form onSubmit={handleResetPassword} method="POST">
                        <h1>Redefinir Senha</h1>

                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" placeholder="Crie uma senha" onChange={handleResetPasswordChange} required />

                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input type="password" id="confirmPassword" placeholder="Confirme sua senha" onChange={handleResetPasswordChange} required />

                        <button type="submit" className={styles.buttonCadastro}>
                            Cadastrar
                        </button>

                        {message && <p>{message}</p>}

                    </form>
                    <footer></footer>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;