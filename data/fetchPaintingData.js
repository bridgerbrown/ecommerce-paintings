export default async function fetchPaintingData(id) {
  try {
    if (!id) {
      return new Error('Painting id is required');
    }

    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}/manifest.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const apiData = await response.json();
      return apiData;
    } else if (response.status === 404) {
      throw new Error("API data not found.")
    } else {
      throw new Error("Error fetching API data.")
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

