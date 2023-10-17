import { GitlabTransferResponseInterface } from '../interfaces/gitlab-transfer.interface';
import { GitlabGroupsInterface, GitlabProjectInterface } from '../interfaces/gitlab.interfaces';
import { BaseService } from './base.service';

export class GitlabService extends BaseService {
    public async getAllGroups(): Promise<Array<GitlabGroupsInterface>> {
        return await this.get<Array<GitlabGroupsInterface>>('groups');
    }

    public async getProjectsFromGroupId(id: number): Promise<Array<GitlabProjectInterface>> {
        return await this.get<Array<GitlabProjectInterface>>('`groups/${id}/projects`');
    }

    public async transferProjectToGroup(projectId: number, groupId: number): Promise<GitlabTransferResponseInterface> {
        return await this.put<GitlabTransferResponseInterface>(`projects/${projectId}/transfer?namespace=${groupId}`);
    }
}
