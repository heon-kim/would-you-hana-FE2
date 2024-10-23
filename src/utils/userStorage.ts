interface User {
  email: string;
  password: string;
  nickname: string;
  name: string;
  gender: string;
  phone: string;
  birthDate: string;
  location: string;
  userType: string;
  interests?: string;
}

const LOCAL_STORAGE_KEY = 'users';

const getUsers = (): User[] => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

const userExists = (email: string) => {
  return getUsers().some((user) => user.email === email);
};

const findUser = (email: string) => {
  return getUsers().find((user) => user.email === email);
};

const findNickname = (nickname: string) => {
  return getUsers().some((user) => user.nickname === nickname);
};

const saveUser = (user: User) => {
  if (!userExists(user.email)) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
  }
};

const updateUser = (user: User) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.email === user.email);

  if (index !== -1) {
    users[index] = user;
    saveUsers(users);
  } else {
    console.error('User not found');
  }
};

export { getUsers, saveUser, findUser, findNickname, updateUser };
