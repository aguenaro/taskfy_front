import React, { createContext, useCallback, useContext, useState } from 'react';

import { IResponse } from 'interfaces/IResponse';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import api from 'services/api';

interface AuthState {
  user: User;
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
  user?: User;
  login: (data: LoginCredentials) => Promise<void>;
  registerUser: (data: UserCreateForm) => Promise<void>;
  updateUser: (data: User) => void;
  logout: () => void;
  loading: boolean;
}

interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

interface IAuthentication {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<AuthState>(() => {
    const cookies = parseCookies(null);

    if (cookies['@Taskfy:token'] && cookies['@Taskfy:user']) {
      api.defaults.headers.authorization = `JWT ${cookies['@Taskfy:token']}`;
      // return { user: JSON.parse(user), token };

      return {
        token: cookies['@Taskfy:token'],
        user: JSON.parse(cookies['@Taskfy:user']),
      };
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

      const { data: response } = await api.post<IResponse<IAuthentication>>(
        '/users/signup',
        {
          username,
          email,
          password,
          firstName,
          lastName,
        }
      );

      const { token, user } = response.data;

      // localStorage.setItem('@Taskfy:token', token);
      setCookie(null, '@Taskfy:token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setCookie(null, '@Taskfy:user', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      // localStorage.setItem('@Taskfy:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Token ${token}`;

      setUserData({ token, user });
      setLoading(false);
    },
    []
  );

  const login = useCallback(
    async ({ emailOrUsername, password }: LoginCredentials) => {
      setLoading(true);
      const { data: response } = await api.post<IResponse<IAuthentication>>(
        '/users/signin',
        {
          emailOrUsername,
          password,
        }
      );
      const { token, user } = response.data;

      // localStorage.setItem('@Taskfy:token', token);
      setCookie(null, '@Taskfy:token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setCookie(null, '@Taskfy:user', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      // localStorage.setItem('@Taskfy:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Token ${token}`;

      setUserData({ token, user });
      setLoading(false);
    },
    []
  );

  const updateUser = useCallback(
    (user: User) => {
      setCookie(null, '@Taskfy:user', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setUserData({ ...userData, user });
    },
    [userData]
  );

  const logout = useCallback(() => {
    destroyCookie(null, '@Taskfy:user');
    destroyCookie(null, '@Taskfy:token');

    router.push('/signin');
    setUserData({} as AuthState);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user: userData.user,
        token: userData.token,
        login,
        logout,
        updateUser,
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
