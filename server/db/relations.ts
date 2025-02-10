import { relations } from "drizzle-orm/relations";
import { projects, collaborators, users, collaboratorRoles, comment, issue, issueType, customField, customFieldOption, customFieldValue, avatarTable, issueStatus, reactions, team, salary, teamRoles, userPicker, userPickerGroup, projectType, priority } from "./schema";

export const collaboratorsRelations = relations(collaborators, ({one, many}) => ({
	project: one(projects, {
		fields: [collaborators.projectId],
		references: [projects.projectId]
	}),
	user: one(users, {
		fields: [collaborators.userId],
		references: [users.userId]
	}),
	collaboratorRoles: many(collaboratorRoles),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
	collaborators: many(collaborators),
	avatarTable: one(avatarTable, {
		fields: [projects.avatar],
		references: [avatarTable.avatarId]
	}),
	projectType: one(projectType, {
		fields: [projects.projectType],
		references: [projectType.typeId]
	}),
	team: one(team, {
		fields: [projects.teamId],
		references: [team.teamId]
	}),
	user: one(users, {
		fields: [projects.projectLead],
		references: [users.userId]
	}),
	issues: many(issue),
}));

export const usersRelations = relations(users, ({many}) => ({
	collaborators: many(collaborators),
	collaboratorRoles: many(collaboratorRoles),
	comments: many(comment),
	reactions: many(reactions),
	salaries: many(salary),
	teamRoles: many(teamRoles),
	teams: many(team),
	projects: many(projects),
}));

export const collaboratorRolesRelations = relations(collaboratorRoles, ({one}) => ({
	collaborator: one(collaborators, {
		fields: [collaboratorRoles.collaboratorGroupId],
		references: [collaborators.collaboratorsId]
	}),
	user: one(users, {
		fields: [collaboratorRoles.userId],
		references: [users.userId]
	}),
}));

export const commentRelations = relations(comment, ({one, many}) => ({
	user: one(users, {
		fields: [comment.creator],
		references: [users.userId]
	}),
	issue: one(issue, {
		fields: [comment.issueId],
		references: [issue.issueId]
	}),
	reactions: many(reactions),
}));

export const issueRelations = relations(issue, ({one, many}) => ({
	comments: many(comment),
	customFieldValues: many(customFieldValue),
	priority: one(priority, {
		fields: [issue.priority],
		references: [priority.priorityId]
	}),
	project: one(projects, {
		fields: [issue.projectId],
		references: [projects.projectId]
	}),
	issueStatus: one(issueStatus, {
		fields: [issue.status],
		references: [issueStatus.statusId]
	}),
	issueType: one(issueType, {
		fields: [issue.type],
		references: [issueType.typeId]
	}),
}));

export const customFieldRelations = relations(customField, ({one, many}) => ({
	issueType: one(issueType, {
		fields: [customField.issueType],
		references: [issueType.typeId]
	}),
	customFieldOptions: many(customFieldOption),
	customFieldValues: many(customFieldValue),
	userPickers: many(userPicker),
}));

export const issueTypeRelations = relations(issueType, ({one, many}) => ({
	customFields: many(customField),
	avatarTable: one(avatarTable, {
		fields: [issueType.avatar],
		references: [avatarTable.avatarId]
	}),
	issues: many(issue),
}));

export const customFieldOptionRelations = relations(customFieldOption, ({one}) => ({
	customField: one(customField, {
		fields: [customFieldOption.customField],
		references: [customField.customFieldId]
	}),
}));

export const customFieldValueRelations = relations(customFieldValue, ({one}) => ({
	customField: one(customField, {
		fields: [customFieldValue.customField],
		references: [customField.customFieldId]
	}),
	issue: one(issue, {
		fields: [customFieldValue.issue],
		references: [issue.issueId]
	}),
}));

export const issueStatusRelations = relations(issueStatus, ({one, many}) => ({
	avatarTable: one(avatarTable, {
		fields: [issueStatus.avatar],
		references: [avatarTable.avatarId]
	}),
	issues: many(issue),
}));

export const avatarTableRelations = relations(avatarTable, ({many}) => ({
	issueStatuses: many(issueStatus),
	issueTypes: many(issueType),
	projects: many(projects),
}));

export const reactionsRelations = relations(reactions, ({one}) => ({
	user: one(users, {
		fields: [reactions.userId],
		references: [users.userId]
	}),
	comment: one(comment, {
		fields: [reactions.message],
		references: [comment.commentId]
	}),
}));

export const salaryRelations = relations(salary, ({one}) => ({
	team: one(team, {
		fields: [salary.teamId],
		references: [team.teamId]
	}),
	user: one(users, {
		fields: [salary.userId],
		references: [users.userId]
	}),
}));

export const teamRelations = relations(team, ({one, many}) => ({
	salaries: many(salary),
	teamRoles: many(teamRoles),
	user: one(users, {
		fields: [team.userId],
		references: [users.userId]
	}),
	projects: many(projects),
}));

export const teamRolesRelations = relations(teamRoles, ({one}) => ({
	team: one(team, {
		fields: [teamRoles.teamId],
		references: [team.teamId]
	}),
	user: one(users, {
		fields: [teamRoles.userId],
		references: [users.userId]
	}),
}));

export const userPickerRelations = relations(userPicker, ({one, many}) => ({
	customField: one(customField, {
		fields: [userPicker.customField],
		references: [customField.customFieldId]
	}),
	userPickerGroups: many(userPickerGroup),
}));

export const userPickerGroupRelations = relations(userPickerGroup, ({one}) => ({
	userPicker: one(userPicker, {
		fields: [userPickerGroup.filter],
		references: [userPicker.userPickerId]
	}),
}));

export const projectTypeRelations = relations(projectType, ({many}) => ({
	projects: many(projects),
}));

export const priorityRelations = relations(priority, ({many}) => ({
	issues: many(issue),
}));