import MapboxLanguage from '@mapbox/mapbox-gl-language';
import store from 'store';

export default {
    methods: {
        mapInitialized(map) {
            this.map = map;
            map.addControl(new MapboxLanguage());
            map.on("load", function () {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(position => {
                        store.set('location', {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        document.querySelector(".mapboxgl-ctrl-geolocate").click();
                    })
                }
            });
        },
        genLayoutMarker(data) {
            const el = document.createElement("div");
            el.className = (data.type == 1) ? "marker marker--found" : "xmarker marker--lost";
            if (data.photo) {
                el.style.backgroundImage = `url(${data.photo})`;
            }
            el.dataset.idPet = data.id;
            el.style.width = data.properties.iconSize[0] ? (data.properties.iconSize[0] + 'px') : '48px';
            el.style.height = data.properties.iconSize[1] ? (data.properties.iconSize[1] + 'px') : '48px';
            el.addEventListener("click",function(e){
                const { target: { dataset: { idPet }}} = e;
                const divPet = document.getElementById(idPet);
                const tabLost = document.getElementById('tab-perdidos') || document.getElementById('tab-encontrados');
                tabLost.scrollTop = divPet.offsetTop - 120;
            });
            return el;
        }
    },
    beforeDestroy() {
        this.map.remove();
    },
    data() {
        return {
            map: {}
        }
    }
}