"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faFilePdf,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

const isPdfUrl = (url) =>
  typeof url === "string" && (url.toLowerCase().endsWith(".pdf") || url.toLowerCase().includes(".pdf?"));

const FileSlide = ({ url, label }) => {
  if (isPdfUrl(url)) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 py-4">
        <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: "64px", color: "#e53e3e" }} />
        <p className="fw-semibold mb-1" style={{ color: "#e53e3e" }}>PDF File</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-danger d-flex align-items-center gap-2"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
          Open PDF
        </a>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <img
        src={url}
        alt={label || "Uploaded content"}
        className="img-fluid"
        style={{ maxHeight: "90vh" }}
      />
    </div>
  );
};

const ImageModal = ({ isOpen, imageUrls, onClose }) => {
  if (!isOpen || !imageUrls?.length) return null;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-body p-4">
            {imageUrls.length === 1 ? (
              <FileSlide url={imageUrls[0]} label="Uploaded content" />
            ) : (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                spaceBetween={10}
                slidesPerView={1}
                style={{ maxHeight: "85vh" }}
              >
                {imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <FileSlide url={url} label={`Uploaded content ${index + 1}`} />
                  </SwiperSlide>
                ))}

                <button ref={prevRef} className="nav-btn prev-btn">
                  <FontAwesomeIcon icon={faCircleChevronLeft} size="lg" />
                </button>
                <button ref={nextRef} className="nav-btn next-btn">
                  <FontAwesomeIcon icon={faCircleChevronRight} size="lg" />
                </button>
              </Swiper>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

