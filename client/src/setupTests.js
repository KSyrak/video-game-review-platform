import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server';
import { vi } from 'vitest';

import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true });

beforeAll(() => {
    server.listen();
});
afterEach(() => {
    cleanup();
    server.resetHandlers();
    localStorage.clear();
});
afterAll(() => {
    server.close();
});