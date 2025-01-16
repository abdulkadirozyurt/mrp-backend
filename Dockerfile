# Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# Sertifika dosyaları için build arg
ARG SSL_CERT_PATH
ARG SSL_KEY_PATH

# Sertifikaları kopyala
COPY ${SSL_CERT_PATH} /app/selfsigned.crt
COPY ${SSL_KEY_PATH} /app/selfsigned.key

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Uygulamayı çalıştır
CMD ["node", "dist/app.js"]

# HTTPS ve HTTP için portları aç
EXPOSE 443
EXPOSE 5000
