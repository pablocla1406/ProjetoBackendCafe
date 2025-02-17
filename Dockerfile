FROM node:16
WORKDIR /usr/src/app

# Install build dependencies for canvas
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Copie apenas o package.json primeiro, para otimizar cache de Docker
COPY package*.json ./

# Remova node_modules existente e instale as dependências
RUN rm -rf node_modules && \
    npm cache clean --force && \
    npm install

# Agora copie o resto dos arquivos
COPY . .

# Exponha a porta que seu servidor irá rodar
EXPOSE 3000

CMD ["npm", "start"]
