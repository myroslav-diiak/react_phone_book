import { QueryType } from "../types/QueryType";

// eslint-disable-next-line
const API_URL = 'https://server-phone-book.netlify.app/.netlify/functions/server';

export async function getDataFromServer(type: QueryType) {
  const response = await fetch(`${API_URL}/${type}`);

  return response.json();
}
