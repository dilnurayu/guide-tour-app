export async function getProfile() {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://guide-tour-api.vercel.app/profile/guide",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error fetching profile: ${response.status} - ${errorText}`
    );
  }
  return response.json();
}
