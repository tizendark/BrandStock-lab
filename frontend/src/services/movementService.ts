import { apiFetch } from '../lib/api';
import { type MovementFormData } from '../components/movements/MovementForm';

export const createMovement = async (data: MovementFormData): Promise<void> => {
  await apiFetch('/movements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
