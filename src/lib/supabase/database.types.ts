export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      concepts: {
        Row: {
          id: string;
          html: string;
          name: string;
          hostname: string;
          url: string;
          template: string;
          score: number;
          source: "template" | "claude";
          created_at: string;
          payload: Json;
          edit_token: string;
        };
        Insert: {
          id: string;
          html: string;
          name: string;
          hostname: string;
          url: string;
          template: string;
          score?: number;
          source: "template" | "claude";
          created_at?: string;
          payload?: Json;
          edit_token?: string;
        };
        Update: {
          id?: string;
          html?: string;
          name?: string;
          hostname?: string;
          url?: string;
          template?: string;
          score?: number;
          source?: "template" | "claude";
          created_at?: string;
          payload?: Json;
          edit_token?: string;
        };
        Relationships: [];
      };
      rate_limit_buckets: {
        Row: {
          bucket_key: string;
          count: number;
          reset_at: string;
        };
        Insert: {
          bucket_key: string;
          count?: number;
          reset_at: string;
        };
        Update: {
          bucket_key?: string;
          count?: number;
          reset_at?: string;
        };
        Relationships: [];
      };
      menu_drafts: {
        Row: {
          id: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          payload?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          payload?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      briefs: {
        Row: {
          id: string;
          locale: string;
          input: string;
          payload: Json;
          created_at: string;
          edit_token: string;
        };
        Insert: {
          id: string;
          locale?: string;
          input: string;
          payload?: Json;
          created_at?: string;
          edit_token?: string;
        };
        Update: {
          id?: string;
          locale?: string;
          input?: string;
          payload?: Json;
          created_at?: string;
          edit_token?: string;
        };
        Relationships: [];
      };
      copy_drafts: {
        Row: {
          id: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          payload?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          payload?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_reports: {
        Row: {
          id: string;
          url: string;
          hostname: string;
          lang: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          url: string;
          hostname: string;
          lang: string;
          payload?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          hostname?: string;
          lang?: string;
          payload?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: "admin" | "client";
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: "admin" | "client";
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: "admin" | "client";
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          business_name: string | null;
          source: string;
          status: string;
          notes: string | null;
          audit_report_id: string | null;
          concept_id: string | null;
          url: string | null;
          hostname: string | null;
          utm: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          business_name?: string | null;
          source: string;
          status?: string;
          notes?: string | null;
          audit_report_id?: string | null;
          concept_id?: string | null;
          url?: string | null;
          hostname?: string | null;
          utm?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          business_name?: string | null;
          source?: string;
          status?: string;
          notes?: string | null;
          audit_report_id?: string | null;
          concept_id?: string | null;
          url?: string | null;
          hostname?: string | null;
          utm?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      sites: {
        Row: {
          id: string;
          concept_id: string;
          owner_id: string;
          slug: string;
          business_name: string;
          whatsapp_e164: string | null;
          status: string;
          plan: string;
          created_at: string;
        };
        Insert: {
          id: string;
          concept_id: string;
          owner_id: string;
          slug: string;
          business_name: string;
          whatsapp_e164?: string | null;
          status?: string;
          plan?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          concept_id?: string;
          owner_id?: string;
          slug?: string;
          business_name?: string;
          whatsapp_e164?: string | null;
          status?: string;
          plan?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          site_id: string;
          daily_menu: Json;
          hours_regular: Json | null;
          hours_overrides: Json;
          announcements: string | null;
          updated_at: string;
        };
        Insert: {
          site_id: string;
          daily_menu?: Json;
          hours_regular?: Json | null;
          hours_overrides?: Json;
          announcements?: string | null;
          updated_at?: string;
        };
        Update: {
          site_id?: string;
          daily_menu?: Json;
          hours_regular?: Json | null;
          hours_overrides?: Json;
          announcements?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      cta_events: {
        Row: {
          id: number;
          site_id: string;
          kind: string;
          context: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          site_id: string;
          kind: string;
          context?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          site_id?: string;
          kind?: string;
          context?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
