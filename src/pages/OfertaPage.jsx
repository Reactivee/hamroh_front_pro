import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import axiosServices from "../utils/axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function OfertaPage() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // Example API PDF URL
  const apiUrl = "https://mapi.hamrohnasiya.uz/api/docs/contract";

  useEffect(() => {
    async function fetchPdf() {
      try {
        const response = await axiosServices("/api/docs/contract", {
          // responseType: 'blob' // Important: To handle binary data
        });
        const file = response?.data?.url;
        window.location.href = file;
        // setPdfUrl(url);
      } catch (error) {
        window.location.href = "/";
        console.error("Error fetching PDF:", error);
      }
    }
    fetchPdf();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Oferta PDF</h1>

      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="border rounded shadow"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p className="text-gray-500">Loading PDF...</p>
      )}
    </div>
  );
}
