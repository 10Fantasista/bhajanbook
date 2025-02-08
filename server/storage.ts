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
        title: "વૈષ્ણવ જન તો તેને કહીએ",
        titleIso: "vaiṣṇava jana tō tēnē kahiē",
        lyrics: "વૈષ્ણવ જન તો તેને કહીએ\nજે પીડ પરાઈ જાણે રે\nપર દુઃખે ઉપકાર કરે તો યે\nમન અભિમાન ન આણે રે",
        lyricsIso: "vaiṣṇava jana tō tēnē kahiē\njē pīḍa parāī jāṇē rē\npara duḥkhē upakāra karē tō yē\nmana abhimāna na āṇē rē",
        description: "ગાંધીજીનું પ્રિય ભજન",
        descriptionIso: "gāndhījīnuṁ priya bhajana",
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
    const bhajan = { ...insertBhajan, id };
    this.bhajans.set(id, bhajan);
    return bhajan;
  }
}

export const storage = new MemStorage();