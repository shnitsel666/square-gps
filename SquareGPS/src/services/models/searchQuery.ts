import Address from "./address";

export default interface SearchQuery {
    lat: string;
    lon: string;
    query: string;
    address: Address;
}