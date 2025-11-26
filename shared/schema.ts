import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Lead schema for storing quote requests
export const leads = pgTable("leads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  skuRange: text("sku_range").notNull(),
  channels: text("channels").array().notNull(),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  skuRange: z.string().min(1, "Vui lòng chọn số lượng SKU"),
  channels: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một kênh"),
  additionalInfo: z.string().nullable().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Chat message types for the conversational UI
export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["assistant", "user"]),
  content: z.string(),
  type: z.enum(["text", "quick_reply", "input", "checkbox", "complete"]).default("text"),
  options: z.array(z.string()).optional(),
  inputType: z.enum(["text", "email", "tel"]).optional(),
  field: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// Chatbot conversation state
export const conversationStateSchema = z.object({
  currentStep: z.number(),
  totalSteps: z.number(),
  collectedData: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    skuRange: z.string().optional(),
    channels: z.array(z.string()).optional(),
    additionalInfo: z.string().optional(),
  }),
  isComplete: z.boolean(),
});

export type ConversationState = z.infer<typeof conversationStateSchema>;

// Users table (keep existing)
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
