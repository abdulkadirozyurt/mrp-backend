# Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /

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

# Dinlenecek port
EXPOSE 5000


