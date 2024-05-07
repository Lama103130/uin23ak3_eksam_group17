import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  // Tilstand for å lagre innloggingsinformasjonen
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Tilstand for å lagre feilmeldinger
  const [error, setError] = useState('');

  // Håndter endringer i skjemafeltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Valider e-postadresse
  const isValidEmail = (email) => {
    // Regulært uttrykk for å validere e-postadresse
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Håndter innsending av skjemaet
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider e-postadresse
    if (!isValidEmail(credentials.username)) {
      setError('Ugyldig e-postadresse');
      return;
    }

    // Implementer logikk for validering av passord her
    if (credentials.password === '') {
      setError('Passord må fylles ut');
      return;
    }

    // Kall påLogin-funksjonen og send innloggingsinformasjonen
    try {
      // Simulerer en autentiserings-API (erstatt med ekte API-kall)
      const response = await fakeAuth(credentials.username, credentials.password);
      
      // Håndter autentiseringsresponsen
      if (response.authenticated) {
        // Lagre brukeridentifikator i LocalStorage
        localStorage.setItem('loggedInUserId', credentials.username);
        // Kall onLogin-funksjonen med brukerens identifikator
        onLogin(credentials.username);
      } else {
        setError('Feil brukernavn eller passord');
      }
    } catch (error) {
      console.error('Feil ved innlogging:', error);
      setError('Noe gikk galt ved innlogging');
    }
  };

  // Simulerer en autentiseringsfunksjon (erstatt med ekte API-kall)
  const fakeAuth = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simulerer en asynkron API-forespørsel
      setTimeout(() => {
        if (username === 'admin@example.com' && password === 'passord') {
          resolve({ authenticated: true });
        } else {
          resolve({ authenticated: false });
        }
      }, 1000);
    });
  };

  return (
    <div>
      <h2>Logg inn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">E-postadresse:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Passord:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Logg inn</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
