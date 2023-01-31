import { loadCurrentUser } from '@/data.js'
import { beforeEach, describe, it, expect } from 'vitest'
describe('data-service', () => {
    beforeEach(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        fetch.mockResponse((req) =>
            req.url === `${API_URL}/users/current` ? Promise.resolve('{}') : new Error(`${req.url} not mocked`)
        );
    })
    it('makes correct call to load current user', async () => {
        const response = await loadCurrentUser();
        expect(response).toBeDefined();
    })
})