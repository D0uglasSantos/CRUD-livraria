# Usar a imagem do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 8800

# Comando para iniciar a aplicação
CMD ["node", "index.js"]