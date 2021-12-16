import config from "./config.json";

const addIfExists = (paramName, params, paramsList) => {
  if (params[paramName] !== undefined) {
    paramsList[paramName] = params[paramName];
  }
};

export function getPetSearch(params, page, pagesize) {
  const paramsList = {};
  [
    "type",
    "gender",
    "color",
    "age",
    "breed",
    "coat",
    "location",
    "shots_current",
    "spayed_neutered",
    "children_friendly",
    "dogs_friendly",
    "cats_friendly",
    "size",
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

export const getAllBreeds = (type) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/get_all_breeds?type=${type}`,
    {
      method: "GET",
    }
  );
};

export const getAllColors = (type) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/get_all_colors?type=${type}`,
    {
      method: "GET",
    }
  );
};

export const getRecommend = (feature, type, page, pagesize) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/recommend?input_feature=${feature}&type=${type}&page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );
};

export const getRescues = async (id) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/rescues?id=${id}`,
    {method: "GET"}
  );
};

export const getSearchRescues = (city, state, type, page, pagesize) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/search/rescues?city=${city}&state=${state}&type=${type}&page=${page}&pagesize=${pagesize}`,
    {method: "GET"}
  );
};

export const getTopTen = (type, feature) => {
  if (type !== "Cat" && type !== "Dog") {
    throw new Error("Invalid API call, type must be Cat or Dog");
  }
  return fetch(
    `http://${config.server_host}:${config.server_port}/top10?type=${type}&feature=${feature}`,
    {method: "GET"}
  );
};

export const getCompare = async (username) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/compare/${username}`,
    {method: "GET"}
  );
};

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

export const getLiked = (username) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/get_all_pets_liked_by_user?username=${username}`,
    {method: "GET"}
  );
};

export const getAllInfo = (id) => {
  return fetch(
    `http://${config.server_host}:${config.server_port}/get_all_info/${id}`,
    {method: "GET"}
  );
};

export const sendLike = async (user, id) => {
  getLiked(user)
    .then((resp) => resp.json())
    .then((resp) => {
      let likedEntries = new Set();
      if (resp.results) {
        likedEntries = new Set([
          ...resp.results.map((item) => "" + item.pet_id),
        ]);
      }

      if (likedEntries.has(id)) {
        // send delete instead
        return fetch(
          `http://${config.server_host}:${config.server_port}/delete_favorite?user=${user}&id=${id}`,
          {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user: `${user}`, id: `${id}`}),
          }
        );
      } else {
        return fetch(
          `http://${config.server_host}:${config.server_port}/mark_favorite?user=${user}&id=${id}`,
          {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user: `${user}`, id: `${id}`}),
          }
        );
      }
    });
};
