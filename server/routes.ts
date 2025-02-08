import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/bhajans", async (_req, res) => {
    const bhajans = await storage.getBhajans();
    res.json(bhajans);
  });

  app.get("/api/bhajans/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const bhajan = await storage.getBhajan(id);
    
    if (!bhajan) {
      return res.status(404).json({ message: "Bhajan not found" });
    }
    
    res.json(bhajan);
  });

  const httpServer = createServer(app);
  return httpServer;
}
