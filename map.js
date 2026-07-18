(() => {
  const mapNode = document.querySelector('#district-map');
  const filtersNode = document.querySelector('#district-map-filters');
  if (!mapNode || !filtersNode || !window.L) return;

  const colors = ['#177bc9', '#03ad1b', '#f07e23', '#9b59b6', '#ff5165', '#ffd166', '#43d1c4'];
  const map = L.map(mapNode, {scrollWheelZoom: false, zoomControl: true}).setView([56.84, 60.61], 8);
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
        if (rings.length) output.push(L.polygon(rings, {...style, fillOpacity: .13}).bindTooltip(title));
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
      filtersNode.innerHTML = '<h3>Показывать на карте</h3><p>Можно включить несколько слоёв одновременно.</p>';

      folders.forEach((folder, index) => {
        const name = firstText(folder, 'name') || `Слой ${index + 1}`;
        const color = colors[index % colors.length];
        const style = {color, weight: name.includes('Округ ') ? 5 : 3, opacity: .9, fillColor: color};
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
          const visible = overlays.filter(item => map.hasLayer(item.group));
          if (visible.length) {
            const bounds = L.featureGroup(visible.map(item => item.group)).getBounds();
            if (bounds.isValid()) map.fitBounds(bounds, {padding: [22, 22], maxZoom: 12});
          }
        });
        filtersNode.appendChild(label);
      });

      const defaults = overlays.filter(item => item.enabled).map(item => item.group);
      const defaultBounds = L.featureGroup(defaults).getBounds();
      if (defaultBounds.isValid()) map.fitBounds(defaultBounds, {padding: [24, 24], maxZoom: 11});
      setTimeout(() => map.invalidateSize(), 100);
    })
    .catch(() => {
      filtersNode.innerHTML = '<div class="map-error"><b>Карта временно недоступна.</b><span>Откройте исходную Google-карту по ссылке выше.</span></div>';
    });
})();
