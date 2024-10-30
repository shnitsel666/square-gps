import Address from "./address";

export default interface GeoResponse {
    address: Address;
    boundingbox: Array<number>;
    lon: number;
    lat: number;
    place_id: number;
}