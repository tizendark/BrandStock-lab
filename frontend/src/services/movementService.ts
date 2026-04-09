import { apiFetch } from '../lib/api';
import { type MovementFormData } from '../components/movements/MovementForm';

export const createMovement = async (data: MovementFormData): Promise<any> => {
  return apiFetch('/movements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
