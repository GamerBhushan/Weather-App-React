const getUserLocation = async (): Promise<
  | { longitude: number; latitude: number; address: string }
  | { error: string }
> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ error: "Geolocation is not supported by your browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using OpenStreetMap API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          resolve({
            longitude,
            latitude,
            address: data.display_name || "Address not found",
          });
        } catch (err) {
          resolve({ error: "Failed to fetch address." });
        }
      },
      (error) => {
        resolve({ error: error.message });
      }
    );
  });
};

export default getUserLocation;
