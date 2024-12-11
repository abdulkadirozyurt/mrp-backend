import mongoose from "mongoose";

export default class DbConfig {
  public static async ConnectDb(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoUri || !dbName) {
      console.error("Gerekli çevresel değişkenler tanımlanmamış.");
      process.exit(1);
    }

    try {
      await mongoose.connect(mongoUri, {
        dbName: dbName,
      });
      console.log("Veritabanına başarıyla bağlandı.");
    } catch (error) {
      console.error("Veritabanına bağlanırken bir hata oluştu:", error);
      process.exit(1); // Bağlantı başarısızsa uygulamayı sonlandır
    }
  }
}
