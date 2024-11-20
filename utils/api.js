const API_BASE_URL = "http://localhost:3000/api";

export async function fetchDepartments() {
  try {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchPeople() {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    if (!response.ok) throw new Error('Failed to fetch people');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchPersonById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch person with id: ${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function addPerson(personData) {
  try {
    const response = await fetch(`${API_BASE_URL}/person`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personData),
    });
    if (!response.ok) throw new Error('Failed to add person');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updatePerson(id, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(`Failed to update person with id: ${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deletePerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/person/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete person with id: ${id}`);
    return true;
  } catch (error) {
    throw error;
  }
}