import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const projectStatuses = ["Pending", "In Progress", "Completed"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export interface Project {
  id: string;
  client: string;
  value: number;
  status: ProjectStatus;
}

export type NewProject = Omit<Project, "id">;

export function isProjectStatus(value: unknown): value is ProjectStatus {
  return (
    typeof value === "string" &&
    projectStatuses.some((status) => status === value)
  );
}

export async function listProjects(
  supabase: SupabaseClient<Database>,
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, client, value, status")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createProject(
  supabase: SupabaseClient<Database>,
  input: NewProject,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert(input)
    .select("id, client, value, status")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
