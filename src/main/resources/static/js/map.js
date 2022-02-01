mapboxgl.accessToken = 'pk.eyJ1IjoiYW1taXRyZXZza2EiLCJhIjoiY2t4bms0djlqNW51dDJ3bzU4N3Y3MHNnMyJ9.3JN-PxishDOcsPGrfSx5JA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [21.4254, 41.9981],
    zoom: 10,
    scrollZoom: true
});

const libraries = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Државен архив на Северна Македонија",
                "city": "",
                "street": "",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4343486,
                    41.9968185
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Германска читалница",
                "city": "Cкoпje",
                "street": "Булевар Гоце Делчев",
                "opening_hours": "Mo  We  Fr 11:00-14:30; Tu  Th 12:00-18:00; Sa[1] 11:00-15:00",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4393671,
                    41.9981313
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Американско катче Македонија",
                "city": "Cкoпje",
                "street": "Булевар Гоце Делчев",
                "opening_hours": "Mo-Fr 10:00-20:00; Sa 11:00-16:00",
                "phone": "+389 2 3120020"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4397823,
                    41.9980573
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Библиотека „Браќа Миладиновци“ - Карпош",
                "city": "Cкoпje",
                "street": "Иван Аговски",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4120526,
                    42.0027424
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Илјада книги",
                "city": "Скопје",
                "street": "",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4354639,
                    41.9946963
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Другарче",
                "city": "",
                "street": "",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4004515,
                    42.0036192
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Архив на град Скопје",
                "city": "",
                "street": "Московска",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.3907447,
                    42.0030932
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Национална и универзитетска библиотека",
                "city": "Cкoпje",
                "street": "Булевар Гоце Делчев",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.439345,
                    41.9979496
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Гралска библиотека браќа миладиновци Скопје",
                "city": "Cкoпje",
                "street": "Булевар Партизански Одреди",
                "opening_hours": "",
                "phone": "+389 2 3162 544"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4201783,
                    41.9997606
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Библиотека „Браќа Миладиновци“",
                "city": "",
                "street": "",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4202483,
                    41.9997022
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Браќа Миладиновци",
                "city": "",
                "street": "Виа Игнација",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.3614728,
                    42.0064775
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Факултетска библиотека и компјутерница",
                "city": "",
                "street": "",
                "opening_hours": "",
                "phone": ""
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    21.4587078,
                    42.0029542
                ]
            }
        }
    ]
};

libraries.features.forEach(function (store, i) {
    store.properties.id = i;
});

map.on('load', () => {
    map.addLayer({
        id: 'locations',
        type: 'circle',
        /* Add a GeoJSON source containing place coordinates and information. */
        source: {
            type: 'geojson',
            data: libraries
        }
    });
    buildLocationList(libraries);
});

map.on('click', (event) => {
    /* Determine if a feature in the "locations" layer exists at that point. */
    const features = map.queryRenderedFeatures(event.point, {
        layers: ['locations']
    });

    /* If it does not exist, return */
    if (!features.length) return;

    const clickedPoint = features[0];

    /* Fly to the point */
    flyToStore(clickedPoint);

    /* Close all other popups and display popup for clicked store */
    createPopUp(clickedPoint);

    /* Highlight listing in sidebar (and remove highlight for all other listings) */
    const activeItem = document.getElementsByClassName('active');
    event.stopPropagation();
    if (activeItem[0]) {
        activeItem[0].classList.remove('active');
    }
    const listing = document.getElementById(
        `listing-${clickedPoint.properties.id}`
    );
    listing.classList.add('active');
});

function buildLocationList(libraries) {
    for (const store of libraries.features) {
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('div'));

        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${store.properties.id}`;

        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = `link-${store.properties.id}`;
        link.innerHTML = `${store.properties.name}`;

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        details.innerHTML = `${store.properties.city}`;
        details.innerHTML = `${store.properties.street}`;
        if (store.properties.phone) {
            details.innerHTML += ` <br> ${store.properties.phone}`;
        }
        if (store.properties.opening_hours) {
            details.innerHTML += ` <br> ${store.properties.opening_hours}`;
        }
        if (store.properties.distance) {
            const roundedDistance = Math.round(store.properties.distance * 100) / 100;
            details.innerHTML += `<div><strong>${roundedDistance} kilometers away</strong></div>`;
        }

        link.addEventListener('click', function () {
            for (const feature of libraries.features) {
                if (this.id === `link-${feature.properties.id}`) {
                    flyToStore(feature);
                    createPopUp(feature);
                }
            }
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });
    }
}

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h5>${currentFeature.properties.name}</h5>`)
        .addTo(map);
}