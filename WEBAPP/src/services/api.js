const API_BASE_URL = "http://localhost:8080";

export async function createPost({ title, content, pseudonymId }) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, pseudonymId }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erreur pendant la creation du post.");
  }

  return response.json();
}

export async function getPseudonyms() {
  const response = await fetch(`${API_BASE_URL}/pseudonyms`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur pendant la recuperation des pseudonymes."
    );
  }

  return response.json();
}

export async function savePseudonym(name) {
  const cleanName = (name || "").trim();
  if (!cleanName) {
    throw new Error("Le pseudonym est obligatoire.");
  }

  const response = await fetch(`${API_BASE_URL}/pseudonyms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: cleanName }),
  });

  if (response.ok) {
    return response.json();
  }

  if (response.status === 409) {
    const pseudonyms = await getPseudonyms();
    const existing = pseudonyms.find((item) => item.name === cleanName);
    if (existing) {
      return existing;
    }
    throw new Error("Pseudonyme existant introuvable.");
  }

  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.message || "Erreur pendant la sauvegarde du pseudo.");
}

export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || "Erreur pendant la recuperation des posts."
    );
  }

  return response.json();
}
