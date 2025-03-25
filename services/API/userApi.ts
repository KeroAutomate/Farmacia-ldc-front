export const getAllUsers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários.');
  }
  return response.json();
};

export const createUser = async (userData: any) => {
  console.log(userData)
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar usuário.');
  }
  return response.json();
};

export const updateUser = async (userId: string, userData: any) => {
  const response = await fetch(`/api/users?id=${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário.');
  }
  return response.json();
};

export const deleteUser = async (userId: string) => {
  const response = await fetch(`/api/users?id=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar usuário.');
  }
  return response.json();
};

// function to get id from user by nome, numero or endereco, and return the id
export const getUserId = async (userData: any): Promise<string> => {
  const response = await fetch(
    `/api/users?nome=${encodeURIComponent(userData.nome)}&numero=${userData.numero}&endereco=${encodeURIComponent(userData.endereco)}`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar usuário.');
  }
  return response.json();
};

