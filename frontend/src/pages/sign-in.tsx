import React from 'react';
import { TextField, Button } from '@mui/material';
import Styles from '../styles/auth/sign-in.module.css';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  return (
    <div>
      <div className={Styles.SignInContainer}>
        <div className={Styles.signIn}>
          <h1 style={{ alignSelf: 'center' }}>Sign In</h1>
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

            <div className={Styles.forgotLink}>
              <Link href='#'> Forgot your password ?</Link>
            </div>

            <div className={Styles.btnSignIn}>
              <button type='submit'>Sign In</button>

              <Link href='/sign-up'> Don&apos;t have an account? Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
