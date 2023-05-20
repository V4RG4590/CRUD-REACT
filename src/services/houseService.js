// houseService.js

const BASE_URL = 'https://644721ab50c25337441ee804.mockapi.io/Students';

export const getHouses = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

export const createHouse = async (house) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(house),
  });
  const data = await response.json();
  return data;
};

export const updateHouse = async (house) => {
  const response = await fetch(`${BASE_URL}/${house.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(house),
  });
  const data = await response.json();
  return data;
};

export const deleteHouse = async (houseId) => {
  const response = await fetch(`${BASE_URL}/${houseId}`, {
    method: 'DELETE',
  });
  return response.ok;
};
