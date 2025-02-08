const BASE_URL = "https://guide-tour-api.vercel.app/resumes/";

export async function createResume(resumeData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error creating resume: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export async function getResume() {
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL + "me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    const errorText = await response.text();
    throw new Error(`Error fetching resume: ${response.status} - ${errorText}`);
  }
  return response.json();
}
