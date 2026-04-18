import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ImageLightbox.css';

const ImageLightbox = () => {
  const { lightboxImage, setLightboxImage } = useCart();

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxImage]);

  if (!lightboxImage) return null;

  return (
    <div className="lightbox-overlay" onClick={() => setLightboxImage(null)}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
          <X size={24} />
        </button>
        <div className="lightbox-content">
          <img src={lightboxImage.url} alt={lightboxImage.title} className="lightbox-image" />
          {lightboxImage.title && <p className="lightbox-caption">{lightboxImage.title}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
