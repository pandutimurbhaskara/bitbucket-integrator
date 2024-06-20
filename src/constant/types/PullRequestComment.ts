export interface PullRequestCommentPayloadType {
    repository:  Repository;
    actor:       Actor;
    pullrequest: PullRequestCommentPayloadTypePullrequest;
    comment:     Comment;
}

export interface Actor {
    display_name: string;
    links:        ActorLinks;
    type:         string;
    uuid:         string;
    account_id:   string;
    nickname:     string;
}

export interface ActorLinks {
    self:   Avatar;
    html:   Avatar;
    avatar: Avatar;
}

export interface Avatar {
    href: string;
}

export interface Comment {
    id:          number;
    created_on:  Date;
    updated_on:  Date;
    content:     Content;
    user:        Actor;
    deleted:     boolean;
    pending:     boolean;
    type:        string;
    links:       CommentLinks;
    pullrequest: CommentPullrequest;
}

export interface Content {
    type:   string;
    raw:    string;
    markup: string;
    html:   string;
}

export interface CommentLinks {
    self: Avatar;
    html: Avatar;
}

export interface CommentPullrequest {
    type:  string;
    id:    number;
    title: string;
    links: CommentLinks;
}

export interface PullRequestCommentPayloadTypePullrequest {
    comment_count:       number;
    task_count:          number;
    type:                string;
    id:                  number;
    title:               string;
    description:         string;
    rendered:            Rendered;
    state:               string;
    merge_commit:        null;
    close_source_branch: boolean;
    closed_by:           null;
    author:              Actor;
    reason:              string;
    created_on:          Date;
    updated_on:          Date;
    destination:         Destination;
    source:              Destination;
    reviewers:           any[];
    participants:        Participant[];
    links:               { [key: string]: Avatar };
    summary:             Content;
}

export interface Destination {
    branch:     Branch;
    commit:     Commit;
    repository: Project;
}

export interface Branch {
    name: string;
}

export interface Commit {
    hash:  string;
    links: CommentLinks;
    type:  string;
}

export interface Project {
    type:       string;
    full_name?: string;
    links:      ActorLinks;
    name:       string;
    uuid:       string;
    key?:       string;
    slug?:      string;
}

export interface Participant {
    type:            string;
    user:            Actor;
    role:            string;
    approved:        boolean;
    state:           null;
    participated_on: Date;
}

export interface Rendered {
    title:       Content;
    description: Content;
}

export interface Repository {
    type:       string;
    full_name:  string;
    links:      ActorLinks;
    name:       string;
    scm:        string;
    website:    null;
    owner:      Owner;
    workspace:  Project;
    is_private: boolean;
    project:    Project;
    uuid:       string;
    parent:     null;
}

export interface Owner {
    display_name: string;
    links:        ActorLinks;
    type:         string;
    uuid:         string;
    username:     string;
}