function getResponse(res) {
  if (!res.ok) {
    return res.json().then((res) => {
      throw new Error(res.message);
    });
  }
  return res.json();
}

export const register = ({ email, password }) => {
  return fetch('http://localhost:3001/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch('http://localhost:3001/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => getResponse(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('isAuth', true);
        return data;
      }
    });
};

export const logout = () => {
  return fetch('http://localhost:3001/signout', {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    localStorage.removeItem('isAuth');
    getResponse(res);
  });
};

export const getUserInfo = () => {
  return fetch('http://localhost:3001/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => getResponse(res));
};
