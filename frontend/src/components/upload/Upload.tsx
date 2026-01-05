import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spinner, Image, CloseButton } from 'react-bootstrap';

import { Notify } from 'notiflix';
import api from '../../helpers';

interface FileUploadComponentProps {
  handleFileUploaded: (fileUrl: string) => void;
  imagenPerfil?: string | null
  hidden?: boolean;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ handleFileUploaded, hidden = false }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [imagen, setImagen] = useState<string | null>(null);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  // Definimos las restricciones para aceptar solo imágenes JPG, JPEG y PNG y xls, xlsx
  const acceptedFileTypes = {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
    'image/webp': [],
    'application/vnd.ms-excel': [],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setFileName(file.name);
      setFileType(file.type);
      setImagen(null); // Resetea el enlace de descarga si se selecciona un nuevo archivo
      setUploadStatus(null); // Limpia el estado de subida
      setDisabledButton(false); // Habilita el botón de subir
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: acceptedFileTypes, // Se añade la restricción de tipos de archivo
  });
  const uploadFile = async (formData:any)=>{
    setUploadStatus('Subiendo...');
    try {
      
      const response = await api.post(`/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        const fileUrl = response.data.url;
        // Solo guardar como imagen si es un archivo de imagen
        const isImage = fileType?.startsWith('image/');
        if (isImage) {
          setImagen(fileUrl);
        }
        setUploadStatus('Archivo subido con éxito.');
        setUploadedFile(null);
        handleFileUploaded(fileUrl);
        setDisabledButton(false);
      } else {
        setUploadStatus('Error al subir el archivo.');
      }
    } catch (error: any) {
      setUploadStatus(`Error: ${error.message}`);
    }
  }
  useEffect(() => {

    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      uploadFile(formData);
    }
  }, [uploadedFile])


  const handleDelete = () => {
    setUploadedFile(null);
    setImagen(null);
    setFileName(null);
    setFileType(null);
    setDisabledButton(true);
    Notify.success('Archivo eliminado con éxito');
  };

  const isExcelFile = () => {
    return fileType === 'application/vnd.ms-excel' || 
           fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  };

  return (
    <div className="p-3 border border-2 border-dashed rounded" style={{ borderColor: 'gray' }}>
      <div
        {...getRootProps()}
        className="p-4 border border-2 border-primary rounded text-center"
        style={{ cursor: 'pointer' }}
        hidden={hidden}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta el archivo aquí...</p>
        ) : (
          <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionarlo</p>
        )}
      </div>

      {/* {uploadedFile && (
        <div className="mt-3 d-flex align-items-center">
          <small className="me-2">Archivo seleccionado: {uploadedFile.name}</small>
          <CloseButton onClick={handleDelete} />
        </div>
      )} */}

      {/* <Button
        onClick={handleUpload}
        variant="primary"
        className="mt-3"
        disabled={!uploadedFile}
      >
        Importar
      </Button> */}

      {uploadStatus === 'Subiendo...' && (
        <div className="mt-3 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}

      {(imagen || (uploadStatus === 'Archivo subido con éxito.' && fileName)) && (
        <div className="mt-4 d-flex justify-content-center">
          <div className="position-relative d-inline-block border border-2 rounded" style={{ width: '150px', minHeight: '100px' }}>
            <CloseButton
              onClick={handleDelete}
              className="position-absolute top-0 end-0 m-2 zindex-1"
              disabled={disabledButton}
            />
            {imagen && !isExcelFile() ? (
              <Image
                src={imagen}
                alt="Imagen subida"
                thumbnail
                style={{ width: '100%', filter: 'drop-shadow(1px 1px 5px #000000)' }}
              />
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-3">
                <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="20" height="24" rx="1" fill="#107C41"/>
                  <rect x="6" y="8" width="16" height="16" fill="#185C37"/>
                  <path d="M9 12L11 14L13 12H15L12 15.5L15 19H13L11 17L9 19H7L10 15.5L7 12H9Z" fill="white"/>
                  <rect x="24" y="4" width="4" height="6" fill="#33C481"/>
                  <rect x="24" y="12" width="4" height="6" fill="#107C41"/>
                  <rect x="24" y="20" width="4" height="8" fill="#185C37"/>
                </svg>
                <small className="text-center mt-2" style={{ fontSize: '10px', wordBreak: 'break-word', maxWidth: '120px' }}>
                  {fileName}
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
