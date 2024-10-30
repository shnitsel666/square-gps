import { mount } from '@vue/test-utils';
import MarkerList from '@/components/MarkerList.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import i18n from './mocks/i18n';
import store from './mocks/store';
import Marker from '@/services/models/marker';

describe('MarkerList.vue', () => {
  const markers: Marker[] = [
    {
      id: '1',
      lat: 55.751244,
      lng: 37.618423,
      address: {
        id: '1',
        road: 'Тверская',
        house_number: '7',
        city: "Москва",
        country: "",
        country_code: "",
        postcode: "",
        region: "",
        state: "",
        suburb: "",
        amenity: "",
      }
    },
    {
      id: '2',
      lat: 55.752023,
      lng: 37.617499,
      address: {
        id: '2',
        road: 'Арбат',
        house_number: '12',
        city: "Москва",
        country: "",
        country_code: "",
        postcode: "",
        region: "",
        state: "",
        suburb: "",
        amenity: "",
      }
    }
  ];

  beforeEach(() => {
    store.commit('address/REMOVE_ADDRESS', '1');
    store.commit('address/REMOVE_ADDRESS', '2');
    store.commit('address/SET_SELECTED_MARKER_ID', null);
  });

  it('renders marker list correctly', () => {
    markers.forEach(marker => {
      store.dispatch('address/addAddress', marker);
    });

    const wrapper = mount(MarkerList, {
      global: {
        plugins: [store, i18n]
      },
      props: {
        markers
      }
    });
    expect(wrapper.find('h2').text()).toBe('Список маркеров');

    const listItems = wrapper.findAll('li');
    expect(listItems.length).toBe(2);

    const firstMarker = listItems[0];
    expect(firstMarker.find('.address-street').text()).toBe('Тверская 7');
    expect(firstMarker.find('.address-coords').text()).toBe('37.618423, 55.751244');

    const secondMarker = listItems[1];
    expect(secondMarker.find('.address-street').text()).toBe('Арбат 12');
    expect(secondMarker.find('.address-coords').text()).toBe('37.617499, 55.752023');
  });

  it('emits markerDeleted event when delete button is clicked', async () => {
    const wrapper = mount(MarkerList, {
      global: {
        plugins: [store, i18n]
      },
      props: {
        markers
      }
    });
  
    const firstMarker = wrapper.findAll('li').at(0);
    expect(firstMarker).toBeTruthy();
  
    const deleteButton = firstMarker?.find('.delete-button');
    expect(deleteButton?.exists()).toBe(true);
  
    await deleteButton?.trigger('click');
  
    expect(wrapper.emitted()).toHaveProperty('markerDeleted');
    expect(wrapper.emitted('markerDeleted')?.[0]).toEqual(['1']);
  });
  

  it('selects a marker when marker-content is clicked', async () => {
    markers.forEach(marker => {
      store.dispatch('address/addAddress', marker);
    });

    const wrapper = mount(MarkerList, {
      global: {
        plugins: [store, i18n]
      },
      props: {
        markers
      }
    });

    const firstMarker = wrapper.findAll('li').at(0);
    expect(firstMarker).toBeTruthy();

    const markerContent = firstMarker?.find('.marker-content');
    expect(markerContent?.exists()).toBe(true);

    await markerContent?.trigger('click');

    const selectedMarkerId = store.getters['address/getSelectedMarkerId'];
    expect(selectedMarkerId).toBe('1');

    expect(firstMarker?.classes()).toContain('selected');
  });

  it('displays fallback text when no markers are present', () => {
    const wrapper = mount(MarkerList, {
      global: {
        plugins: [store, i18n]
      },
      props: {
        markers: []
      }
    });

    expect(wrapper.find('[data-testid="fallback-text"]').text()).toBe('Ничего не выбрано.');

    expect(wrapper.find('ul').exists()).toBe(false);
  });
});
