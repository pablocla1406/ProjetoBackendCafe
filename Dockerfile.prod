FROM node:16
WORKDIR /usr/src/app

# Copie apenas o package.json primeiro, para otimizar cache de Docker
COPY package*.json ./

# Instale as dependências
RUN npm install

# Agora copie o resto dos arquivos
COPY . .

# Exponha a porta que seu servidor irá rodar
EXPOSE 3000

CMD ["npm", "start"]

