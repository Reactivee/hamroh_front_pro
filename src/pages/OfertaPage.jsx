import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import Loading from "../components/Loading";

// ✅ Worker config for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function OfertaPage() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  // Example API PDF URL
  const apiUrl = "https://mapi.hamrohnasiya.uz/api/docs/contract";

  useEffect(() => {
    async function fetchPdf() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://mapi.hamrohnasiya.uz/api/docs/offer"
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log(url);
        // window.open(url);
        // Close current tab (only works if this tab was opened via JS)
        window.close();
        window.location.href = url;
        // window.open(url, "_blank");
        //   const response = await axiosServices.get("/docs/offer", {
        //     // responseType: 'blob' // Important: To handle binary data
        //   });
        //   const file = response?.data?.url;
        //   window.location.href = file;
        //   // setPdfUrl(url);
      } catch (error) {
        window.location.href = "/";
        console.error("Error fetching PDF:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPdf();
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Hamrohnasiya</h1>

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
      ) : null}
      {loading && <Loading />}
    </div>
  );
}
