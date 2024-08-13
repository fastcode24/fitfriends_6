import { pdfjs, Document, Page } from 'react-pdf';
import './pdf-styles.css';

interface PdfPreviewProps {
  fileUrl: string;
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export const PdfPreview = ({ fileUrl }: PdfPreviewProps) => {
  return (
    <div className="pdf-container">
      <Document
        file={fileUrl}
        options={options}
        className="pdf-canvas"
      >
        <Page
          pageNumber={1}
          width={294}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
};

