import Address from "./address";

export default interface SearchResult {
    place_id?: string;
    display_name?: string;
    lat?: number;
    lon?: number;
    address?: Address;
  }