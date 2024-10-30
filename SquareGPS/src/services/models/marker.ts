import Address from "./address";

export default interface Marker {
    id: string;
    lat?: number;
    lng?: number;
    address?: Address;
}