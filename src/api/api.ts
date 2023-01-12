import { Companies } from "../types/Companies";
import { Contacts } from "../types/Contacts";
import { QueryType } from "../types/QueryType";

// eslint-disable-next-line
const API_URL = 'https://server-phone-book.netlify.app/.netlify/functions/server';

export async function getDataFromServer(type: QueryType) {
  const response = await fetch(`${API_URL}/${type}`);

  return response.json();
}

export async function deleteItemFromServer(type: QueryType, id: number) {
  const response = await fetch(`${API_URL}/${type}/${id}`, {
    method: 'DELETE',
  });

  return response.json();
}

export async function createNewContact(data: Contacts) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newContact: data,
    })
  });

  return response.json();
}

export async function updateContactOnServer(data: Contacts, id: number) {
  const response = await fetch(`${API_URL}/contacts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newContact: data,
    })
  });

  return response.json();
}

export async function createNewCompany(data: Companies) {
  const response = await fetch(`${API_URL}/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newCompany: data,
    })
  });

  return response.json();
}

export async function updateCompanyOnServer(data: Companies, id: number) {
  const response = await fetch(`${API_URL}/companies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newCompany: data,
    })
  });

  return response.json();
}
