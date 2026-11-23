const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

function getUrl(path) {
  if (!API_BASE_URL) {
    throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env e reinicie o Expo.');
  }
  return `${API_BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

async function request(path, options) {
  const response = await fetch(getUrl(path), {
    ...options,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!response.ok) throw new Error(`A API respondeu com erro HTTP ${response.status}.`);
  return response.json();
}

export const api = {
  get(path) {
    return request(path);
  },
  create(path, data) {
    return request(path, { method: 'POST', body: JSON.stringify(data) });
  },
};
