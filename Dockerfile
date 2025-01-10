# # Node.js resmi imajını kullan
# FROM node:20

# # Çalışma dizinini ayarla
# WORKDIR /app

# # package.json ve package-lock.json dosyalarını kopyala
# COPY package*.json ./

# # Bağımlılıkları yükle
# RUN npm install

# # Tüm dosyaları kopyala
# COPY . .


# # Uygulamayı build et
# RUN npm run build

# # Uygulamayı çalıştır
# CMD ["node", "dist/app.js"]

# # Dinlenecek port
# EXPOSE 5000



# Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# Çevre değişkenlerini build-time'da ayarlamak için ARG kullan
ARG PORT=5000
ARG MONGO_URI
ARG DB_NAME
ARG CLIENT_URL
ARG JWT_SECRET

# Çevre değişkenlerini çalışma zamanı için ENV ile ayarla
ENV PORT=$PORT
ENV MONGO_URI=$MONGO_URI
ENV DB_NAME=$DB_NAME
ENV CLIENT_URL=$CLIENT_URL
ENV JWT_SECRET=$JWT_SECRET

# Uygulamayı build et
RUN npm run build

# Uygulamayı çalıştır
CMD ["node", "dist/app.js"]

# Dinlenecek port
EXPOSE 5000
