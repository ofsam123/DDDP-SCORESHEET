import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FileUploadZone = ({
  isDragOver,
  isLoading,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInput,
}) => {
  return (
    <Card
      className={`max-w-3xl mx-auto border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out shadow-sm ${
        isDragOver
          ? "border-blue-500 bg-blue-50/60 scale-[1.02]"
          : "border-gray-300 hover:border-blue-400 bg-white"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="p-12 text-center flex flex-col items-center justify-center">
        {/* File Icon / Loader */}
        <div
          className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 transition-all duration-300 ${
            isDragOver
              ? "bg-blue-100 scale-110 ring-2 ring-blue-300"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          ) : (
            <FileSpreadsheet
              className={`w-12 h-12 transition-colors ${
                isDragOver ? "text-blue-600" : "text-gray-400"
              }`}
            />
          )}
        </div>

        {/* Header Text */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          {isLoading ? "Processing File..." : "Upload Excel File"}
        </h3>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Drag and drop your <span className="font-medium text-blue-600">.xlsx</span> or{" "}
          <span className="font-medium text-blue-600">.xls</span> file here, or click below to browse.
        </p>

        {/* Upload Button */}
        <div className="space-y-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button
              asChild
              disabled={isLoading}
              size="lg"
              className={`gap-2 px-6 py-5 text-base rounded-xl ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                {isLoading ? "Uploading..." : "Select File"}
              </span>
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={onFileInput}
              disabled={isLoading}
            />
          </label>

          {/* File Type Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span>Supports .xlsx</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span>Supports .xls</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FileUploadZone;
