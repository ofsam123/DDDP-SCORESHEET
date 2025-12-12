import { Button } from "../ui/button";
import { Card } from "../ui/card";
import "../../pages/styles.css";

import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";

export const FileUploadZone = ({
  isDragOver,
  isLoading,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInput,
}) => {
  return (
    <Card
      className={`max-w-3xl mx-auto border-2 border-dashed transition-all duration-300 ${
        isDragOver
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="file-upload-container">
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-300 ${
            isDragOver ? "bg-primary/20 scale-110" : "bg-muted"
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          ) : (
            <FileSpreadsheet
              className={`w-10 h-10 transition-colors ${
                isDragOver ? "text-primary" : "text-muted-foreground"
              }`}
            />
          )}
        </div>

        <h3 className="text-2xl font-semibold mb-2">
          {isLoading ? "Processing file..." : "Upload Excel File"}
        </h3>
        <p className="text-muted-foreground mb-2">
          Drag and drop your .xlsx or .xls file here
        </p>
        {/* <p className="text-xs text-muted-foreground mb-8">
          Maximum file size: 10MB
        </p> */}

        <div>
          <Button 
            variant="outline" 
            disabled={isLoading} 
            size="default" 
            className="gap-2 border-2 hover:bg-gray-50 hover:border-blue-300 cursor-pointer file-upload-button"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <Upload className="w-4 h-4" />
            {isLoading ? "Processing..." : "Select File"}
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            className="sr-only"
            onChange={onFileInput}
            disabled={isLoading}
            style={{ display: 'none' }}
          />

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground file-support-text">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Supports .xlsx</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Supports .xls</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
