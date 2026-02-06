import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/cv/aridevmx.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error loading resume:", err));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-12 print:p-0">
      {/* Controls - Hidden when printing */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => navigate("/")} className="gap-2 bg-white text-black hover:bg-gray-100 hover:text-black border-gray-200">
          <ArrowLeft className="h-4 w-4" />
          Back to Site
        </Button>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print Resume
        </Button>
      </div>

      {/* Resume Content */}
      <article className="max-w-4xl mx-auto prose prose-slate prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-li:text-gray-700 print:max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
      
      {/* Print-specific footer if needed, or just let it be clean */}
      <style>{`
        @media print {
          @page {
            margin: 1.5cm;
          }
          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
