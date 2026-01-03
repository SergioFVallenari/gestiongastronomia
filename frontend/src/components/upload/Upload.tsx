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
  // Definimos las restricciones para aceptar solo imágenes JPG, JPEG y PNG
  const acceptedFileTypes = {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
    'image/webp': [],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
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
        setImagen(fileUrl);
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
    setDisabledButton(true);
    Notify.success('Archivo eliminado con éxito');
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

      {imagen && (
        <div className="mt-4 d-flex justify-content-center">
          <div className="position-relative d-inline-block border border-2 rounded" style={{ width: '150px' }}>
            <CloseButton
              onClick={handleDelete}
              className="position-absolute top-0 end-0 m-2 zindex-1"
              disabled={disabledButton}
            />
            <Image
              src={imagen}
              alt="Imagen subida"
              thumbnail
              style={{ width: '100%', filter: 'drop-shadow(1px 1px 5px #000000)' }}
            />
          </div>
        </div>

      )}
    </div>
  );
};

export default FileUploadComponent;
