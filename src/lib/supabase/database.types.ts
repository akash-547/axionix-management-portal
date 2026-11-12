export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          client: string;
          value: number;
          status: "Pending" | "In Progress" | "Completed";
          created_at: string;
        };
        Insert: {
          id?: string;
          client: string;
          value: number;
          status: "Pending" | "In Progress" | "Completed";
          created_at?: string;
        };
        Update: {
          id?: string;
          client?: string;
          value?: number;
          status?: "Pending" | "In Progress" | "Completed";
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
