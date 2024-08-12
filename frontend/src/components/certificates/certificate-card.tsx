import { PdfPreview } from "@components";

interface CertificateCardProps {
  fileUrl: string;
  handleCertificateDelete: (fileUrl: string) => void;
}

export const CertificateCard = ({ fileUrl, handleCertificateDelete }: CertificateCardProps) => {

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div  className="certificate-card__image">
          <PdfPreview fileUrl={fileUrl} />
        </div>
        <div onClick={() => handleCertificateDelete(fileUrl)} className="certificate-card__buttons">
          <div className="certificate-card__controls">
            <button
              className="user-info-edit__control-btn"
              type="button"
              aria-label="delete"
              style={{
                position: 'relative',
                zIndex: 10,
              }}
            >
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
