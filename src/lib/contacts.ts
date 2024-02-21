import useSWR, { SWRResponse } from "swr";

export type Contact = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
  createdAt?: number;
};

export const SERVER_URL = "http://localhost:3500/contacts";

export const useContacts = (): SWRResponse<Contact[]> => {
  return useSWR(`${SERVER_URL}?_sort=-completed,-created`);
};

export const useContact = (id: string): SWRResponse<Contact> => {
  return useSWR(`${SERVER_URL}/${id}`);
};

export const createContact = async (): Promise<Contact> => {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify({
      createdAt: Date.now(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
};

export const createContactUtility = (created: Contact, contacts: Contact[]) => {
  return [created, ...contacts];
};

export const updateContact = async (
  id: string,
  contact: Contact
): Promise<Contact> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(contact),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
};

export const deleteContact = async (id: string): Promise<unknown> => {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};
