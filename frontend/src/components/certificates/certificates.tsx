import { useAppDispatch } from "@/hooks";
import { fileUploadService } from "@/services/file-storage-service";
import { updateUserAction } from "@/store/api-actions";
import { FullUser } from "@/types";
import { CertificateCard } from "@components";
import { handleNext, handlePrevious, removeHostFromUrl } from '@utils';
import { useEffect, useMemo, useRef, useState } from "react";

interface CertificatesProps {
  user: FullUser;
}

export function Certificates({user}: CertificatesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [certificates, setCertificates] = useState<string[]>(user.certificates || []);
  const VISIBLE_ITEMS = 3;
  const SLIDER_STEP = 1;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setCertificates(user.certificates || []);
  }, [user.certificates]);

  const totalItems = useMemo(() => certificates.length, [certificates]);

  const handleCertificateDelete = (url: string) => {
    const updatedCertificates = certificates.filter(cert => cert !== url);
    const certificatesToSend = [...updatedCertificates].map(cert => removeHostFromUrl(cert));
    setCertificates(updatedCertificates);

    if (user.id) {
      dispatch(updateUserAction({id: user.id, updateData: {certificates: certificatesToSend}}));
    }

    if (currentIndex >= updatedCertificates.length) {
      setCurrentIndex(Math.max(0, updatedCertificates.length - VISIBLE_ITEMS));
    }

    window.location.reload();
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const {path} = await fileUploadService(file);
        const updatedCertificates = [path, ...certificates];
        setCertificates(updatedCertificates);

        if (user.id) {
          const certificatesToSend = [...updatedCertificates].map(cert => removeHostFromUrl(cert));
          dispatch(updateUserAction({id: user.id, updateData: {certificates: certificatesToSend}}));
        }

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        window.location.reload();
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
      }
    }
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button
          className="btn-flat btn-flat--underlined personal-account-coach__button"
          type="button"
          onClick={handleUploadClick}
        >
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-import"></use>
          </svg>
          <span>Загрузить</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <div className="personal-account-coach__controls">
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            onClick={() => setCurrentIndex((prevIndex: number) => handlePrevious(prevIndex, SLIDER_STEP))}
            disabled={currentIndex === 0}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="next"
            onClick={() => setCurrentIndex((prevIndex: number) => handleNext(prevIndex, totalItems, SLIDER_STEP))}
            disabled={currentIndex + VISIBLE_ITEMS >= totalItems}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list">
        {certificates && certificates.slice(currentIndex, currentIndex + VISIBLE_ITEMS).map((url) => (
          <CertificateCard key={url} fileUrl={url} handleCertificateDelete={handleCertificateDelete} />
        ))}
      </ul>
    </div>
  );
}
