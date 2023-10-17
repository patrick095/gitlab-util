export interface GitlabGroupsInterface {
    id: number;
    name: string;
    path: string;
    description: string;
    visibility: string;
    share_with_group_lock: boolean;
    require_two_factor_authentication: boolean;
    two_factor_grace_period: number;
    project_creation_level: string;
    auto_devops_enabled?: any;
    subgroup_creation_level: string;
    emails_disabled?: any;
    mentions_disabled?: any;
    lfs_enabled: boolean;
    default_branch_protection: number;
    avatar_url: string;
    web_url: string;
    request_access_enabled: boolean;
    repository_storage: string;
    full_name: string;
    full_path: string;
    file_template_project_id: number;
    parent_id?: any;
    created_at: string;
    ip_restriction_ranges?: any;
}

export interface GitlabProjectInterface {
    id: number;
    description: string;
    default_branch: string;
    tag_list: any[];
    topics: any[];
    archived: boolean;
    visibility: string;
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    issues_enabled: boolean;
    merge_requests_enabled: boolean;
    wiki_enabled: boolean;
    jobs_enabled: boolean;
    snippets_enabled: boolean;
    created_at: string;
    last_activity_at: string;
    shared_runners_enabled: boolean;
    creator_id: number;
    namespace: GitlabProjectNamespaceInterface;
    avatar_url: any;
    star_count: number;
    forks_count: number;
    open_issues_count: number;
    public_jobs: boolean;
    shared_with_groups: any[];
    request_access_enabled: boolean;
}

export interface GitlabProjectNamespaceInterface {
    id: number;
    name: string;
    path: string;
    kind: string;
}
