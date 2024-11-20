import { registerUser, loginUser } from '../services/authService.js';
import { getClients } from '../services/clientService.js';
import dotenv from 'dotenv';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export async function updateClients(req, res) {
  try {
    // Регистрация пользователя
    console.log('Регистрация пользователя...');
    await registerUser(USERNAME, PASSWORD);

    // Авторизация и получение токена
    console.log('Авторизация пользователя...');
    const loginData = await loginUser(USERNAME, PASSWORD);
    const token = loginData.token;

    console.log('Полученный токен:', token);
    if (!token) {
      throw new Error('Не удалось получить токен авторизации');
    }

    // Получение данных клиентов
    console.log('Запрос данных клиентов...');
    const clientsData = await getClients(token);

    // Запись данных в CSV-файл
    console.log('Запись данных в CSV-файл...');
    const csvWriter = createObjectCsvWriter({
      path: 'clients_data.csv',
      header: [
        { id: 'id', title: 'ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'gender', title: 'Gender' },
        { id: 'address', title: 'Address' },
        { id: 'city', title: 'City' },
        { id: 'phone', title: 'Phone' },
        { id: 'email', title: 'Email' },
        { id: 'status', title: 'Status' },
      ],
    });

    await csvWriter.writeRecords(clientsData);

    console.log('Данные клиентов успешно записаны в CSV-файл');
    res.status(200).send('Данные клиентов успешно записаны в CSV-файл');
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).send('Произошла ошибка при обновлении данных клиентов');
  }
}

