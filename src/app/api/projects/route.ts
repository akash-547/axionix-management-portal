import { calculateProjectShares } from "@/lib/agency";
import {
  createProject,
  isProjectStatus,
  listProjects,
} from "@/lib/projects-store";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (
    authError &&
    authError.status !== 401 &&
    authError.name !== "AuthSessionMissingError"
  ) {
    console.error("Failed to verify project API user.", authError);
    return Response.json(
      { error: "Unable to verify authentication." },
      { status: 500 },
    );
  }

  if (!user) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const projects = await listProjects(supabase);

    return Response.json(
      projects.map((project) => ({
        ...project,
        ...calculateProjectShares(project.value),
      })),
    );
  } catch (error) {
    console.error("Failed to fetch projects from Supabase.", error);
    return Response.json(
      { error: "Unable to load projects." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (
    authError &&
    authError.status !== 401 &&
    authError.name !== "AuthSessionMissingError"
  ) {
    console.error("Failed to verify project API user.", authError);
    return Response.json(
      { error: "Unable to verify authentication." },
      { status: 500 },
    );
  }

  if (!user) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    return Response.json({ error: "Request body must be an object." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const client = typeof body.client === "string" ? body.client.trim() : "";

  if (!client) {
    return Response.json(
      { error: "Client must be a non-empty string." },
      { status: 400 },
    );
  }

  if (
    typeof body.value !== "number" ||
    !Number.isFinite(body.value) ||
    body.value < 0
  ) {
    return Response.json(
      { error: "Value must be a finite, non-negative number." },
      { status: 400 },
    );
  }

  if (!isProjectStatus(body.status)) {
    return Response.json(
      { error: "Status must be Pending, In Progress, or Completed." },
      { status: 400 },
    );
  }

  try {
    const project = await createProject(supabase, {
      client,
      value: body.value,
      status: body.status,
    });

    return Response.json(
      { ...project, ...calculateProjectShares(project.value) },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to save project to Supabase.", error);
    return Response.json(
      { error: "Unable to save project." },
      { status: 500 },
    );
  }
}
