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
      {
        number: 2,
        title: "રઘુપતિ રાઘવ રાજા રામ",
        titleIso: "raghupati rāghava rājā rāma",
        lyrics: "રઘુપતિ રાઘવ રાજા રામ\nપતિત પાવન સીતા રામ\nઈશ્વર અલ્લાહ તેરો નામ\nસબકો સન્મતિ દે ભગવાન",
        lyricsIso: "raghupati rāghava rājā rāma\npatita pāvana sītā rāma\nīśvara allāha tērō nāma\nsabakō sanmati dē bhagavāna",
        description: "ગાંધીજીનું બીજું પ્રિય ભજન",
        descriptionIso: "gāndhījīnuṁ bījuṁ priya bhajana",
      },
      {
        number: 3,
        title: "શ્રી કૃષ્ણ શરણં મમ",
        titleIso: "śrī kr̥ṣṇa śaraṇaṁ mama",
        lyrics: "શ્રી કૃષ્ણ શરણં મમ\nશ્રી કૃષ્ણ શરણં મમ\nહરે કૃષ્ણ હરે કૃષ્ણ\nકૃષ્ણ કૃષ્ણ હરે હરે",
        lyricsIso: "śrī kr̥ṣṇa śaraṇaṁ mama\nśrī kr̥ṣṇa śaraṇaṁ mama\nharē kr̥ṣṇa harē kr̥ṣṇa\nkr̥ṣṇa kr̥ṣṇa harē harē",
        description: "કૃષ્ણ શરણાગતિનું ભજન",
        descriptionIso: "kr̥ṣṇa śaraṇāgatinuṁ bhajana",
      },
      {
        number: 4,
        title: "ઓમ જય શિવ ઓમકારા",
        titleIso: "ōm jaya śiva ōmkārā",
        lyrics: "ઓમ જય શિવ ઓમકારા\nપ્રભુ હર શિવ ઓમકારા\nબ્રહ્મા વિષ્ણુ સદાશિવ\nઅર્ધાંગી ધારા",
        lyricsIso: "ōm jaya śiva ōmkārā\nprabhu hara śiva ōmkārā\nbrahmā viṣṇu sadāśiva\nardhāṅgī dhārā",
        description: "શિવ આરતી",
        descriptionIso: "śiva āratī",
      },
      {
        number: 5,
        title: "જય ગણેશ જય ગણેશ",
        titleIso: "jaya gaṇēśa jaya gaṇēśa",
        lyrics: "જય ગણેશ જય ગણેશ દેવા\nમાતા જાકી પાર્વતી પિતા મહાદેવા",
        lyricsIso: "jaya gaṇēśa jaya gaṇēśa dēvā\nmātā jākī pārvatī pitā mahādēvā",
        description: "ગણેશ વંદના",
        descriptionIso: "gaṇēśa vandanā",
      }
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