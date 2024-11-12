# Usa una imagen de Node.js como base
FROM node:18

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY backend/ .

# Instala las dependencias
RUN npm install

RUN npm run build;

# Expone el puerto en el que tu app escucha (ajusta según tu app)
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "run", "start"]
