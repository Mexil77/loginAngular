# Selecciona la imagen de Node.js 14 como base
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios para tu aplicación de Angular en el contenedor
COPY . /usr/src/app

# Instala las dependencias de tu aplicación de Angular
RUN npm install

# Compila tu aplicación de Angular en el contenedor
RUN ng build

# Expone el puerto 80 en el contenedor
EXPOSE 80

# Especifica el comando que se ejecutará cuando inicies el contenedor
CMD ["npm", "start"]

