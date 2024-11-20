import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export async function getClients(token) {
  console.log('Запрос данных клиентов с токеном:', token);
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: 'GET',
    headers: { 'Authorization': `${token}` },
  });

  console.log('Статус ответа:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Ошибка ответа:', errorText);
    throw new Error('Ошибка при получении данных клиентов');
  }

  return response.json();
}
