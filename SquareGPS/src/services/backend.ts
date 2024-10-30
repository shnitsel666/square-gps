import Marker from "./models/marker";

class Backend {
  private static STORAGE_KEY = 'markers';

  static getMarkers(): Promise<Marker[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const markers = localStorage.getItem(this.STORAGE_KEY);
        resolve(markers ? JSON.parse(markers) : []);
      }, 500);
    });
  }

  static addMarker(marker: Marker): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const markers = await this.getMarkers();
        markers.push(marker);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(markers));
        resolve();
      }, 200);
    });
  }

  static getMarkerById(id: string): Promise<Marker | null> {
    return new Promise(async (resolve) => {
      const markers = await this.getMarkers();
      const marker = markers.find((m) => m.id === id) || null;
      resolve(marker);
    });
  }

  static deleteMarker(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const markers = await this.getMarkers();
        const updatedMarkers = markers.filter(marker => marker.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedMarkers));
        resolve();
      }, 200);
    });
  }
}

export default Backend;
