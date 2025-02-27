import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Link, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../helpers';

const BASE_URL = import.meta.env.VITE_API_URL_DONFAUSTINO;

interface FileUploadComponentProps {
  handleFileUploaded: (fileUrl: string) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ handleFileUploaded }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  // Definimos las restricciones para aceptar solo imágenes JPG, JPEG y PNG
  const acceptedFileTypes = {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setDownloadLink(null); // Resetea el enlace de descarga si se selecciona un nuevo archivo
      setUploadStatus(null); // Limpia el estado de subida
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: acceptedFileTypes, // Se añade la restricción de tipos de archivo
  });

  const handleUpload = async () => {
    if (!uploadedFile) {
      setUploadStatus('No hay archivo seleccionado.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      setUploadStatus('Subiendo...');

      const response = await api.post(`${BASE_URL}/upload/upload_file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        const fileUrl = response.data.url;
        setDownloadLink(fileUrl);
        setUploadStatus('Archivo subido con éxito.');
        setUploadedFile(null);
        handleFileUploaded(fileUrl);
      } else {
        setUploadStatus('Error al subir el archivo.');
      }
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
    setDownloadLink(null);
    setUploadStatus('Archivo eliminado.');
  };

  return (
    <Box sx={{ padding: 3, border: '1px dashed gray', borderRadius: 2 }}>
      <Box
        {...getRootProps()}
        sx={{
          padding: 3,
          border: '2px dashed #007bff',
          borderRadius: 1,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">Suelta el archivo aquí...</Typography>
        ) : (
          <Typography variant="body1">Arrastra y suelta un archivo aquí, o haz clic para seleccionarlo</Typography>
        )}
      </Box>

      {uploadedFile && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">Archivo seleccionado: {uploadedFile.name}</Typography>
          <IconButton
            color="secondary"
            onClick={handleDelete}
            sx={{ marginLeft: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}

      <Button
        onClick={handleUpload}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        disabled={!uploadedFile}
      >
        Importar
      </Button>

      {uploadStatus && (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {uploadStatus}
        </Typography>
      )}

      {uploadStatus === 'Subiendo...' && (
        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {downloadLink && (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={downloadLink} alt="Imagen subida" style={{ width: '30%',filter: 'drop-shadow(1px 1px 5px #000000)' }} />
          <Link href={downloadLink} download target="_BLANK">
            Hacer clic para descargar el archivo
          </Link>
          <IconButton
            color="secondary"
            onClick={handleDelete}
            sx={{ marginLeft: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default FileUploadComponent;
