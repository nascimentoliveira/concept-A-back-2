import { Project } from "@/protocols";
import { duplicatedNameError, notFoundError } from "@/errors";
import { projectsRepository } from "@/repositories";

export async function getAllProjects(): Promise<Project[]> {
  return projectsRepository.getAll();
}

export async function getProject(id: number): Promise<Project> {
  await validateIdExistsOrFail(id);
  return projectsRepository.findById(id);
}

export async function createProject(project: ProjectParams): Promise<Project> {
  await validateUniqueNameOrFail(project.name);
  return projectsRepository.create(project.name);
}

export async function updateProject(project: ProjectParams, projectId: number): Promise<Project> {
  await validateIdExistsOrFail(projectId);
  await validateUniqueNameOrFail(project.name);
  return projectsRepository.update(projectId, project.name);
}

export async function deleteProject(id: number) {
  await validateIdExistsOrFail(id);
  const project = await projectsRepository.deleteProject(id);
  return { id: project.id };
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName: Project = await projectsRepository.findByName(name);
  if (projectWithSameName) {
    throw duplicatedNameError("project");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const projectExists: Project = await projectsRepository.findById(id);
  if (!projectExists) {
    throw notFoundError("No project was found with this id");
  }
}

export type ProjectParams = Pick<Project, "name">;

export const projectsService = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
