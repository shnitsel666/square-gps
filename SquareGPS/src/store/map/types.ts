import SearchResult from "@/services/models/searchResult";

export default interface AddressState {
  selectedAddress: SearchResult | null;
  searchResults: SearchResult[];
  isAddingMarker: boolean;
  selectedMarkerId: string | null;
}