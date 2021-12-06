import config from "./config.json";

// 35702
async function getPetSearch(params, page, pagesize) {
  const {
    type,
    gender,
    color,
    age,
    breed,
    location,
    shotsCurrent,
    spayedNeutered,
    childrenFriendly,
    dogsFriendly,
    catsFriendly,
  } = params;
  let res = await fetch(
    `http://${config.server_host}:${config.server_port}/petsearch?type=${type}&gender=${gender}&color=${color}&breed=${breed}&age=${age}&location=${location}&spayed_neutered=${spayedNeutered}&shots_current=${shotsCurrent}&children_friendly=${childrenFriendly}&dogs_friendly=${dogsFriendly}&cats_friendly=${catsFriendly}&page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );

  return res.json();
}

// 0
const getRecommend = async (feature, type, page, pagesize) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/recommend?feature=${feature}&type=${type}&page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );

  return res.json();
};

// 5294
const getRescues = async (id) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/rescues?id=${id}`,
    { method: "GET" }
  );

  return res.json();
};

const getSearchRescues = async (city, state, page, pagesize) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/rescues?city=${city}&state=${state}&page=${page}&pagesize=${pagesize}`,
    { method: "GET" }
  );

  return res.json();
};

// 0
const getTopTen = async (type, feature) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/top10/type=${type}&feature=${feature}?`,
    { method: "GET" }
  );

  return res.json();
};

// 0
const getCompare = async (username) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/compare/username?=${username}`,
    { method: "GET" }
  );

  return res.json();
};

// 0
const getSimilar = async (username, type, page, pagesize) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/get_similar?username=${username}&type=${type}&page=${page}&pagesize=${pagesize}`,
    { method: "GET" }
  );

  return res.json();
};

// 0
const getUserLogin = async (email, password) => {
  const res = await fetch(
    `http://${config.server_host}:${config.server_port}/user_login?email=${email}$password=${password}`,
    { method: "GET" }
  );

  return res.json();
};

export {
  getPetSearch,
  getRecommend,
  getRescues,
  getSearchRescues,
  getTopTen,
  getCompare,
  getSimilar,
  getUserLogin,
};
