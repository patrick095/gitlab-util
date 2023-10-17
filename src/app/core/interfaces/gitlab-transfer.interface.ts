export interface GitlabTransferResponseInterface {
    id: number;
    description: string;
    description_html: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: string;
    updated_at: string;
    default_branch: string;
    tag_list: any[];
    topics: any[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    readme_url: string;
    avatar_url: any;
    forks_count: number;
    star_count: number;
    last_activity_at: string;
    namespace: GitlabTransferResponseNamespaceInterface;
    container_registry_image_prefix: string;
    _links: GitlabTransferResponseLinksInterface;
    packages_enabled: boolean;
    empty_repo: boolean;
    archived: boolean;
    visibility: string;
    resolve_outdated_diff_discussions: boolean;
    container_registry_enabled: boolean;
    container_registry_access_level: string;
    container_expiration_policy: GitlabTransferResponseContainerExpirationPolicyInterface;
    issues_enabled: boolean;
    merge_requests_enabled: boolean;
    wiki_enabled: boolean;
    jobs_enabled: boolean;
    snippets_enabled: boolean;
    service_desk_enabled: boolean;
    service_desk_address: any;
    can_create_merge_request_in: boolean;
    issues_access_level: string;
    repository_access_level: string;
    merge_requests_access_level: string;
    forking_access_level: string;
    analytics_access_level: string;
    wiki_access_level: string;
    builds_access_level: string;
    snippets_access_level: string;
    pages_access_level: string;
    security_and_compliance_access_level: string;
    emails_disabled: any;
    emails_enabled: any;
    shared_runners_enabled: boolean;
    group_runners_enabled: boolean;
    lfs_enabled: boolean;
    creator_id: number;
    import_status: string;
    open_issues_count: number;
    ci_default_git_depth: number;
    public_jobs: boolean;
    build_timeout: number;
    auto_cancel_pending_pipelines: string;
    ci_config_path: any;
    shared_with_groups: any[];
    only_allow_merge_if_pipeline_succeeds: boolean;
    allow_merge_on_skipped_pipeline: any;
    restrict_user_defined_variables: boolean;
    request_access_enabled: boolean;
    only_allow_merge_if_all_discussions_are_resolved: boolean;
    remove_source_branch_after_merge: boolean;
    printing_merge_request_link_enabled: boolean;
    merge_method: string;
    squash_option: string;
    suggestion_commit_message: any;
    merge_commit_template: any;
    auto_devops_enabled: boolean;
    auto_devops_deploy_strategy: string;
    autoclose_referenced_issues: boolean;
    approvals_before_merge: number;
    mirror: boolean;
    compliance_frameworks: any[];
}

export interface GitlabTransferResponseNamespaceInterface {
    id: number;
    name: string;
    path: string;
    kind: string;
    full_path: string;
    parent_id: any;
    avatar_url: any;
    web_url: string;
}

export interface GitlabTransferResponseLinksInterface {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
}

export interface GitlabTransferResponseContainerExpirationPolicyInterface {
    cadence: string;
    enabled: boolean;
    keep_n: any;
    older_than: any;
    name_regex: any;
    name_regex_keep: any;
    next_run_at: string;
}
