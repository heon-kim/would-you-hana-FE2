import {User, Banker} from "../constants/users"

const LOCAL_STORAGE_KEY = 'users';
const LOCAL_STORAGE_KEY2 = 'bankers';

const getBankers = (): Banker[] => {
  const bankers = localStorage.getItem(LOCAL_STORAGE_KEY2);
  return bankers ? JSON.parse(bankers) : [];
}

const getUsers = (): User[] => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveBankers = (bankers: Banker[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(bankers));
}

const saveUsers = (users: User[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

const bankerExists = (email: string) => {
  return getBankers().some((banker) => banker.email === email);
};

const userExists = (email: string) => {
  return getUsers().some((user) => user.email === email);
};

const findBanker = (email: string) => {
  return getBankers().find((banker) => banker.email === email);
};

const findUser = (email: string | null) => {
  if (!email) return null;
  
  const users = getUsers();
  return users.find(user => user.email === email);
};

const hasNickname = (nickname: string) => {
  return getUsers().some((user) => user.nickname === nickname);
};

const saveBanker = (banker : Banker) => {
  if(!bankerExists(banker.email)) {
    const bankers = getBankers();
    bankers.push(banker);
    saveBankers(bankers);
  }
}
const saveUser = (user: User) => {
  if (!userExists(user.email)) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
  }
};

const updateBanker = (banker : Banker) => {
  const bankers = getBankers();
  const index = bankers.findIndex((u) => u.email === banker.email);

  if (index !== -1) {
    bankers[index] = banker;
    saveBankers(bankers);
  } else {
    console.error('Banker not found');
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

export { getUsers, getBankers, saveUser, saveBanker, findUser, findBanker, hasNickname, updateUser, updateBanker };
