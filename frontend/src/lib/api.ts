import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Object {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreateObjectDto {
  title: string;
  description: string;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const objectsApi = {
  getAll: () => api.get<Object[]>('/objects'),
  getById: (id: string) => api.get<Object>(`/objects/${id}`),
  create: (data: CreateObjectDto, file: File) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', file);
    
    return api.post<Object>('/objects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id: string) => api.delete(`/objects/${id}`),
};
