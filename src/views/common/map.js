import PostMap from "../../components/common/PostMap";

export default {
    components: {
        PostMap
    },
    methods: {
        mapInitialized(map) {
            this.map = map;
        },
        genLayoutMarker(data) {
            const el = document.createElement("div");
            el.className = (data.type == 1) ? "marker marker--encontrado" : "marker marker--perdido";
            if (data.photo) {
                el.style.backgroundImage = `url(${data.photo})`;
            }
            el.style.width = data.properties.iconSize[0] ? (data.properties.iconSize[0] + 'px') : '48px';
            el.style.height = data.properties.iconSize[1] ? (data.properties.iconSize[1] + 'px') : '48px';
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