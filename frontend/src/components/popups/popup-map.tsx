import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup as LeafletPopup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import { FullUser } from "@types";
import { metroCoordinates } from '@/const';

function MapControl() {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.zoomControl.remove();
  }, [map]);

  return null;
}

interface PopupMapProps {
  user: FullUser,
  onClose: () => void;
}

export function PopupMap({ user, onClose }: PopupMapProps): JSX.Element {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const { latitude, longitude } = metroCoordinates[user.metro];

  return (
    <div className="wrapper">
      <main>
        <div className="popup-form popup-form--map">
          <section className="popup">
            <div className="popup__wrapper popup__wrapper--map">
              <div className="popup-head popup-head--address">
                <h2 className="popup-head__header">{user.name}</h2>
                <p className="popup-head__address">
                  <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg><span>{user.metro}</span>
                </p>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                  onClick={onClose}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content-map">
                <div className="popup__map custom-cursor">
                  <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '600px', width: '100%' }}>
                    <MapControl />
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution=""
                    />
                    <Marker position={[latitude, longitude]}>
                      <LeafletPopup>
                        {user.metro}
                      </LeafletPopup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
