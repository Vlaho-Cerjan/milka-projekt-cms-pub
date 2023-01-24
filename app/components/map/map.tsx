import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Link from "../navigation/Link";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';
import { Box } from '@mui/material';
import L, { LatLngExpression } from 'leaflet';

const LeafletMap = ({coords, link, title}: {coords: LatLngExpression, link: string, title: string}) => {
    const icon = L.icon({
        iconUrl: "../../../icons/location.png",
        iconSize: [35, 35],
    });

    return (
        <Box sx={{ height: "600px" }}>
            <MapContainer style={{ height: "600px" }} center={coords} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={icon} position={coords}>
                <Popup>
                    <strong><Link target="_blank" href={link}>{title}</Link></strong>
                </Popup>
                </Marker>
            </MapContainer>
        </Box>
    )
}

export default LeafletMap;