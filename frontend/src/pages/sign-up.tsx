import React from 'react';
import { TextField, Button } from '@mui/material';
import Styles from '../styles/auth/sign-in.module.css';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  return (
    <div>
      <div className={Styles.SignInContainer}>
        <div className={Styles.signIn}>
          <h1 style={{ alignSelf: 'center' }}>Sign Up</h1>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
            />
            <TextField
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
            />
            <TextField
              type='password'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              label='Confirm Password'
            />

            <div className={Styles.btnSignIn}>
              <button type='submit'>Sign Up</button>

              <Link href='/sign-in'> Already have an account? Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
