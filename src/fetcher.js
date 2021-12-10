import config from "./config.json";

const addIfExists = (paramName, params, paramsList) => {
  if (params[paramName] !== undefined) {
    paramsList[paramName] = params[paramName];
  }
};

// 35702
export function getPetSearch(params, page, pagesize) {
  const paramsList = {};
  [
    "type",
    "gender",
    "color",
    "age",
    "breed",
    "location",
    "shots_current",
    "spayed_neutered",
    "children_friendly",
    "dogs_friendly",
    "cats_friendly",
  ].map((item) => addIfExists(item, params, paramsList));

  const queryString = Object.entries(paramsList)
    .map(([key, value]) => {
      return `&${key}=${value}`;
    })
    .join("");

  return fetch(
    `http://${config.server_host}:${config.server_port}/petsearch?page=${page}&pagesize=${pagesize}${queryString}`,
    {
      method: "GET",
    }
  );
}

// 0
export const getRecommend = async (feature, type, page, pagesize) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/recommend?input_feature=${feature}&type=${type}&page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );
};

// 5294
export const getRescues = async (id) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/rescues?id=${id}`,
    {method: "GET"}
  );
};

export const getSearchRescues = (city, state, page, pagesize) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/search/rescues?city=${city}&state=${state}&page=${page}&pagesize=${pagesize}`,
    {method: "GET"}
  );
};

// 0
export const getTopTen = (type, feature) => {
  if (type !== "Cat" && type !== "Dog") {
    throw new Error("Invalid API call, type must be Cat or Dog");
  }
  return fetch(
    `http://${config.server_host}:${config.server_port}/top10?type=${type}&feature=${feature}`,
    {method: "GET"}
  );
};

// 0
export const getCompare = async (username) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/compare/username?=${username}`,
    {method: "GET"}
  );
};

// 0
export const getSimilar = async (username, type, page, pagesize) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/get_similar?username=${username}&type=${type}&page=${page}&pagesize=${pagesize}`,
    {method: "GET"}
  );
};

export const getUserLogin = (email, password) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/user_login?email=${email}&password=${password}`,
    {method: "GET"}
  );
};
