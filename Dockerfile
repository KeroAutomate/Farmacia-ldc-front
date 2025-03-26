# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./ 

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para dentro do contêiner
COPY . .

# Gera o build da aplicação
RUN npm run build

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar a aplicação no ambiente de produção
CMD ["npm", "run", "start"]
