import React, { useState } from 'react';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import HealthCheckLogo from "../../assets/plus.png";
import { useForgotPassword } from './hooks';
import { errorAlert } from '../../utils';
import { useIsMutating } from '@tanstack/react-query';

function ForgotPassword() {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
      });
    const {mutate,isSuccess,isError,reset,error} = useForgotPassword()

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const isLoading = useIsMutating()
    
      const handleSubmit = (e) => {
        e.preventDefault();
       mutate(formData)
      };

      if (isSuccess) {
        reset()
        setFormData()
        navigate("/")
      }

      if (isError) {
       errorAlert(error) 
       reset()
      }
    
      return (
        <div className={styles.App}>
          <div className={styles.logo}><Link to="/"> <img src={HealthCheckLogo} alt="aa-rano-logo" /></Link></div>
          <div className={styles.header}>Welcome Back!</div>
          <p className={styles.description}>Let's help you recover your account</p>
          <form className={styles['form-container']} onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
              <div className={styles['input-container']}>
                <input
                  className={styles['email-input']}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button className={styles['submit-button']} disabled={isLoading? true : false} type="submit">{isLoading ? "loading" : "Submit"}</button>
          </form>
          <div className={styles['register-text']}>
            Remember Password? <Link to="/login">Sign in</Link>
          </div>
        </div>
      );
    }

export default ForgotPassword;