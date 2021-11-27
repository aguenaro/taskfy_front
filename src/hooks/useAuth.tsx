import React, { createContext, useCallback, useContext, useState } from 'react';

import { IResponse } from 'interfaces/IResponse';
import { parseCookies, setCookie } from 'nookies';
// import User from 'interfaces/User';
import api from 'services/api';

interface AuthState {
  // user: User;
  token: string;
}

interface UserCreateForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  login: (data: LoginCredentials) => Promise<void>;
  registerUser: (data: UserCreateForm) => Promise<void>;
  loading: boolean;
}

interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

interface IToken {
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<AuthState>(() => {
    // const user = localStorage.getItem('@Taskfy:user');
    // const token = localStorage.getItem('@Taskfy:token');
    const cookies = parseCookies(null);

    if (cookies['@Taskfy:token']) {
      api.defaults.headers.authorization = `JWT ${cookies['@Taskfy:token']}`;
      // return { user: JSON.parse(user), token };

      return { token: cookies['@Taskfy:token'] };
    }

    return {} as AuthState;
  });

  const registerUser = useCallback(
    async ({
      username,
      email,
      firstName,
      lastName,
      password,
    }: UserCreateForm) => {
      setLoading(true);

      const { data: response } = await api.post<IResponse<IToken>>(
        '/users/signup',
        {
          username,
          email,
          password,
          firstName,
          lastName,
        }
      );

      const { token } = response.data;

      // localStorage.setItem('@Taskfy:token', token);
      setCookie(null, '@Taskfy:token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      // localStorage.setItem('@Taskfy:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Token ${token}`;

      setUserData({ token });
      setLoading(false);
    },
    []
  );

  const login = useCallback(
    async ({ emailOrUsername, password }: LoginCredentials) => {
      setLoading(true);
      const { data: response } = await api.post<IResponse<IToken>>(
        '/users/signin',
        {
          emailOrUsername,
          password,
        }
      );
      const { token } = response.data;

      // localStorage.setItem('@Taskfy:token', token);
      setCookie(null, '@Taskfy:token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      // localStorage.setItem('@Taskfy:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Token ${token}`;

      await setUserData({ token });
      setLoading(false);
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        // user: userData.user,
        token: userData.token,
        login,
        // logout,
        // updateUser,
        registerUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
