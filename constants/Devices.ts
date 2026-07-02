export interface Device {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export const mockDevices: Device[] = [
  // Original Bangalore Devices
  { id: "DEV001", name: "Temperature Sensor", latitude: 12.9716, longitude: 77.5946 },
  { id: "DEV002", name: "Pressure Sensor", latitude: 12.9750, longitude: 77.6000 },
  { id: "DEV003", name: "Flow Meter", latitude: 12.9780, longitude: 77.6020 },
  
  // Mangaluru Region Devices
  { id: "DEV004", name: "Coastal Weather Station", latitude: 12.8722, longitude: 74.8423 }, 
  { id: "DEV005", name: "Lab Network Node", latitude: 12.8194, longitude: 74.8778 }, 
  { id: "DEV006", name: "Port Logistics Tracker", latitude: 12.9298, longitude: 74.8005 }, 
];