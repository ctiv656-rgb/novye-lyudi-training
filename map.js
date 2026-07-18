(() => {
  const mapNode = document.querySelector('#district-map');
  const filtersNode = document.querySelector('#district-map-filters');
  if (!mapNode || !filtersNode || !window.L) return;

  const colors = ['#177bc9', '#03ad1b', '#f07e23', '#9b59b6', '#ff5165', '#ffd166', '#43d1c4'];
  const ekaterinburgView = {center: [56.838, 60.605], zoom: 10};
  const map = L.map(mapNode, {scrollWheelZoom: false, zoomControl: true}).setView(ekaterinburgView.center, ekaterinburgView.zoom);
  let searchMarker;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  const directChildren = (node, name) => [...node.children].filter(child => child.localName === name);
  const firstText = (node, name) => {
    const child = directChildren(node, name)[0];
    return child ? child.textContent.trim() : '';
  };
  const coordinates = text => text.trim().split(/\s+/).map(item => {
    const [lng, lat] = item.split(',').map(Number);
    return [lat, lng];
  }).filter(item => Number.isFinite(item[0]) && Number.isFinite(item[1]));

  function geometryLayers(node, style, title) {
    const output = [];
    for (const child of node.children) {
      if (child.localName === 'Point') {
        const coords = coordinates(firstText(child, 'coordinates'));
        if (coords[0]) output.push(L.circleMarker(coords[0], {...style, radius: 6, fillOpacity: .85}).bindTooltip(title));
      } else if (child.localName === 'LineString') {
        const coords = coordinates(firstText(child, 'coordinates'));
        if (coords.length) output.push(L.polyline(coords, style).bindTooltip(title));
      } else if (child.localName === 'Polygon') {
        const rings = [...child.getElementsByTagNameNS('*', 'LinearRing')].map(ring => {
          const coordNode = ring.getElementsByTagNameNS('*', 'coordinates')[0];
          return coordNode ? coordinates(coordNode.textContent) : [];
        }).filter(ring => ring.length);
        if (rings.length) output.push(L.polygon(rings, {...style, fillOpacity: .2}).bindTooltip(title));
      } else if (child.localName === 'MultiGeometry') {
        output.push(...geometryLayers(child, style, title));
      }
    }
    return output;
  }

  fetch('map.kml?v=map1')
    .then(response => {
      if (!response.ok) throw new Error('Не удалось загрузить KML');
      return response.text();
    })
    .then(text => {
      const xml = new DOMParser().parseFromString(text, 'application/xml');
      const folders = [...xml.getElementsByTagNameNS('*', 'Folder')].filter(folder => directChildren(folder, 'Placemark').length);
      const overlays = [];
      filtersNode.innerHTML = `<form class="map-search"><label for="map-address">Найти адрес</label><div><input id="map-address" type="search" placeholder="Улица и номер дома" autocomplete="street-address"><button type="submit" aria-label="Найти адрес">Найти</button></div><output class="map-search-result" aria-live="polite"></output></form><h3>Показывать на карте</h3><p>Можно включить несколько слоёв одновременно.</p>`;

      const searchForm = filtersNode.querySelector('.map-search');
      const searchInput = searchForm.querySelector('input');
      const searchOutput = searchForm.querySelector('output');
      searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;
        searchOutput.textContent = 'Ищем адрес…';
        fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ru&q=${encodeURIComponent(`${query}, Екатеринбург`)}`)
          .then(response => response.json())
          .then(results => {
            if (!results.length) {
              searchOutput.textContent = 'Адрес не найден. Уточните улицу и номер дома.';
              return;
            }
            const result = results[0];
            const point = [Number(result.lat), Number(result.lon)];
            if (searchMarker) searchMarker.remove();
            searchMarker = L.marker(point).addTo(map).bindPopup(`<b>Найденный адрес</b><br>${result.display_name}`).openPopup();
            map.setView(point, 16);
            searchOutput.textContent = result.display_name;
          })
          .catch(() => { searchOutput.textContent = 'Не удалось выполнить поиск. Попробуйте ещё раз.'; });
      });

      folders.forEach((folder, index) => {
        const name = firstText(folder, 'name') || `Слой ${index + 1}`;
        const color = colors[index % colors.length];
        const style = {color, weight: name.includes('Округ ') ? 7 : 5, opacity: 1, fillColor: color};
        const features = [];
        directChildren(folder, 'Placemark').forEach(placemark => {
          const title = firstText(placemark, 'name') || name;
          features.push(...geometryLayers(placemark, style, title));
        });
        const group = L.featureGroup(features);
        const enabled = name.includes('Округ Ранта') || name.includes('Округ Дёмина');
        if (enabled) group.addTo(map);
        overlays.push({name, group, enabled, color});

        const label = document.createElement('label');
        label.className = `map-filter ${enabled ? 'active' : ''}`;
        label.innerHTML = `<input type="checkbox" ${enabled ? 'checked' : ''}><i style="--layer-color:${color}"></i><span>${name}</span>`;
        const input = label.querySelector('input');
        input.addEventListener('change', () => {
          if (input.checked) group.addTo(map); else group.removeFrom(map);
          label.classList.toggle('active', input.checked);
          map.setView(ekaterinburgView.center, ekaterinburgView.zoom);
        });
        filtersNode.appendChild(label);
      });

      map.setView(ekaterinburgView.center, ekaterinburgView.zoom);
      setTimeout(() => map.invalidateSize(), 100);
    })
    .catch(() => {
      filtersNode.innerHTML = '<div class="map-error"><b>Карта временно недоступна.</b><span>Откройте исходную Google-карту по ссылке выше.</span></div>';
    });
})();
