FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Establecer directorio de trabajo
WORKDIR /app 

# Copiar package.json y package-lock.json
COPY package*.json ./ 
# Instalar dependencias 
RUN npm install 
# Copiar el resto del proyecto 
COPY . . 
# Ejecutar los tests por defecto 
CMD ["npx", "playwright", "test"]
