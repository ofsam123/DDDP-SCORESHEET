import { Button } from "../ui/button";
import { Card } from "../ui/card";

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
      <div className="p-12 text-center">
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
        <p className="text-muted-foreground mb-8">
          Drag and drop your .xlsx or .xls file here, or click to browse
        </p>

        <div className="space-y-4">
          <label htmlFor="file-upload">
            <Button asChild disabled={isLoading} size="lg" className="gap-2">
              <span>
                <Upload className="w-4 h-4" />
                Select File
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

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
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
