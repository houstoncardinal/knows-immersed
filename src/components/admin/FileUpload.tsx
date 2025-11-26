import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, File, FileText, Image, FileArchive, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

interface FileUploadProps {
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  onUpload?: (files: UploadedFile[]) => void;
  multiple?: boolean;
}

export const FileUpload = ({
  maxSize = 10,
  acceptedTypes = ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx"],
  onUpload,
  multiple = true,
}: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const filesArray = Array.from(fileList);

      // Validate file size
      const invalidFiles = filesArray.filter((file) => file.size > maxSize * 1024 * 1024);
      if (invalidFiles.length > 0) {
        toast.error(`Some files exceed the ${maxSize}MB size limit`);
        return;
      }

      setIsUploading(true);

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const uploadedFiles: UploadedFile[] = filesArray.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date(),
      }));

      setFiles((prev) => [...prev, ...uploadedFiles]);
      setIsUploading(false);

      toast.success(`${filesArray.length} file(s) uploaded successfully`);

      if (onUpload) {
        onUpload(uploadedFiles);
      }
    },
    [maxSize, onUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    toast.info("File removed");
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="w-5 h-5" />;
    if (type === "application/pdf") return <FileText className="w-5 h-5" />;
    if (type.includes("zip") || type.includes("rar")) return <FileArchive className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <Card
        className={`p-8 border-2 border-dashed transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-card/50 hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`p-4 rounded-full mb-4 ${isUploading ? "animate-bounce" : ""} bg-primary/10`}>
            <Upload className="w-8 h-8 text-primary" />
          </div>

          {isUploading ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold">Uploading files...</p>
              <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink animate-progress" />
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold mb-2">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground mb-4">
                Maximum file size: {maxSize}MB
              </p>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple={multiple}
                accept={acceptedTypes.join(",")}
                onChange={handleFileInput}
              />

              <label htmlFor="file-upload">
                <Button asChild>
                  <span className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Select Files
                  </span>
                </Button>
              </label>
            </>
          )}
        </div>
      </Card>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Uploaded Files ({files.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiles([])}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-all group"
              >
                <div className="flex-shrink-0 text-primary">
                  {getFileIcon(file.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)} • {file.uploadedAt.toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
