// Configure MapTiler
maptilersdk.config.apiKey = "C6b0dKK4CqHAHoEajTSB";

// Create Map
const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates,
    zoom: 12,
});

// ---------- Custom Marker ----------

// Create HTML Element
const markerElement = document.createElement("div");

markerElement.innerHTML = `
    <i class="fa-solid fa-location-dot custom-marker"></i>
`;

// ---------- Popup ----------

const popup = new maptilersdk.Popup({
    offset: 30,
    closeButton: false,
    closeOnClick: false,
}).setHTML(`
    <div class="popup-content">
        <h5>
            <i class="fa-solid fa-house"></i>
            <b>${listingTitle}</b>
        </h5>

        <p>${listingLocation}</p>

        <small>You will be here.</small>
    </div>
`);

// ---------- Marker ----------

const marker = new maptilersdk.Marker({
    element: markerElement,
})
.setLngLat(coordinates)
.setPopup(popup)
.addTo(map);

// ---------- Hover Events ----------

markerElement.addEventListener("mouseenter", () => {
    popup
        .setLngLat(coordinates)
        .addTo(map);
});

markerElement.addEventListener("mouseleave", () => {
    popup.remove();
});