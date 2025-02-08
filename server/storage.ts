import { bhajans, type Bhajan, type InsertBhajan } from "@shared/schema";

export interface IStorage {
  getBhajans(): Promise<Bhajan[]>;
  getBhajan(id: number): Promise<Bhajan | undefined>;
  createBhajan(bhajan: InsertBhajan): Promise<Bhajan>;
}

export class MemStorage implements IStorage {
  private bhajans: Map<number, Bhajan>;
  currentId: number;

  constructor() {
    this.bhajans = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleBhajans: InsertBhajan[] = [
      {
        number: 1,
        title: "ॐ जय जगदीश हरे",
        titleEnglish: "Om Jai Jagdish Hare",
        lyrics: "ॐ जय जगदीश हरे\nस्वामी जय जगदीश हरे\nभक्त जनों के संकट\nदास जनों के संकट\nक्षण में दूर करे\nॐ जय जगदीश हरे",
        lyricsEnglish: "Om Jai Jagdish Hare\nSwami Jai Jagdish Hare\nBhakt Jano Ke Sankat\nDaas Jano Ke Sankat\nKshan Men Dur Kare\nOm Jai Jagdish Hare",
        description: "एक लोकप्रिय आरती",
        descriptionEnglish: "A popular aarti",
      },
      // Add more sample bhajans as needed
    ];

    sampleBhajans.forEach(bhajan => this.createBhajan(bhajan));
  }

  async getBhajans(): Promise<Bhajan[]> {
    return Array.from(this.bhajans.values()).sort((a, b) => a.number - b.number);
  }

  async getBhajan(id: number): Promise<Bhajan | undefined> {
    return this.bhajans.get(id);
  }

  async createBhajan(insertBhajan: InsertBhajan): Promise<Bhajan> {
    const id = this.currentId++;
    const bhajan: Bhajan = { ...insertBhajan, id };
    this.bhajans.set(id, bhajan);
    return bhajan;
  }
}

export const storage = new MemStorage();
