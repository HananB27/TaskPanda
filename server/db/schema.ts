import { pgTable, varchar, timestamp, integer, foreignKey, date, boolean, numeric, primaryKey } from "drizzle-orm/pg-core"


export const collaborators = pgTable("collaborators", {
	collaboratorsId: varchar("collaborators_ID").primaryKey().notNull(),
	projectId: varchar("project_ID").notNull(),
	userId: varchar("user_ID").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.projectId],
			name: "project_ID"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_ID"
		}),
]);

export const collaboratorRoles = pgTable("collaborator_roles", {
	collaboratorRolesId: varchar("collaborator_roles_ID").primaryKey().notNull(),
	collaboratorGroupId: varchar("collaborator_group_ID").notNull(),
	name: varchar().notNull(),
	permissions: integer().notNull(),
	description: varchar(),
	userId: varchar("user_ID").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.collaboratorGroupId],
			foreignColumns: [collaborators.collaboratorsId],
			name: "collaborator_group_id"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_id"
		}),
]);

export const users = pgTable("users", {
	username: varchar({ length: 64 }).notNull(),
	firstName: varchar("first_name", { length: 64 }).notNull(),
	lastName: varchar("last_name", { length: 64 }).notNull(),
	email: varchar({ length: 320 }).notNull(),
	password: varchar().notNull(),
	createdDate: date("created_date").notNull(),
	userId: varchar("user_ID").primaryKey().notNull(),
	updatedDate: varchar("updated_date"),
	isActive: boolean("is_active").default(false).notNull(),
	lastActive: timestamp("last_active", { precision: 6, withTimezone: true, mode: 'string' }).notNull(),
	avatar: varchar(),
});

export const comment = pgTable("comment", {
	commentId: varchar("comment_ID").primaryKey().notNull(),
	content: varchar(),
	creator: varchar().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).notNull(),
	reaction: varchar(),
	issueId: varchar("issue_ID").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.creator],
			foreignColumns: [users.userId],
			name: "comment___creator"
		}),
	foreignKey({
			columns: [table.issueId],
			foreignColumns: [issue.issueId],
			name: "issue_id"
		}).onDelete("cascade"),
]);

export const customField = pgTable("custom_field", {
	customFieldId: varchar("custom_field_ID").primaryKey().notNull(),
	issueType: varchar("issue_type").notNull(),
	fieldKey: varchar("field_key").notNull(),
	fieldType: varchar("field_type").notNull(),
	description: varchar(),
	fieldName: varchar("field_name").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.issueType],
			foreignColumns: [issueType.typeId],
			name: "custom_field_issue_type_type_id_fk"
		}),
]);

export const customFieldOption = pgTable("custom_field_option", {
	optionId: varchar("option_ID").primaryKey().notNull(),
	customField: varchar("custom_field").notNull(),
	config: varchar().notNull(),
	parentOptionId: varchar("parent_option_ID"),
	enabled: boolean().default(false).notNull(),
	orderNumber: varchar("order_number").notNull(),
	value: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.customField],
			foreignColumns: [customField.customFieldId],
			name: "custom_field_option_custom_field_custom_field_id_fk"
		}),
]);

export const customFieldValue = pgTable("custom_field_value", {
	customFieldValueId: varchar("custom_field_value_ID").primaryKey().notNull(),
	issue: varchar().notNull(),
	customField: varchar("custom_field").notNull(),
	updated: varchar(),
	parentKey: varchar("parent_key"),
	stringValue: varchar("string_value"),
	numberValue: integer("number_value"),
	textValue: varchar("text_value"),
	dateValue: date("date_value"),
}, (table) => [
	foreignKey({
			columns: [table.customField],
			foreignColumns: [customField.customFieldId],
			name: "custom_field_value___custom_field"
		}),
	foreignKey({
			columns: [table.issue],
			foreignColumns: [issue.issueId],
			name: "custom_field_value___issue"
		}),
]);

export const priority = pgTable("priority", {
	priorityId: varchar("priority_ID").primaryKey().notNull(),
	name: varchar().notNull(),
	avatar: varchar().notNull(),
	color: varchar().default('#FFFF00').notNull(),
});

export const issueStatus = pgTable("issue_status", {
	statusId: varchar("status_ID").primaryKey().notNull(),
	name: varchar().notNull(),
	avatar: varchar(),
	color: varchar().default('#FFFFFF').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.avatar],
			foreignColumns: [avatarTable.avatarId],
			name: "avatar"
		}),
]);

export const avatarTable = pgTable("avatar_table", {
	avatarId: varchar("avatar_ID").primaryKey().notNull(),
	url: varchar().notNull(),
	owner: varchar().notNull(),
	contentType: varchar("content_type").notNull(),
	ownerType: varchar("owner_type"),
});

export const projectType = pgTable("project_type", {
	typeId: varchar("type_ID").primaryKey().notNull(),
	typeName: varchar("type_name", { length: 100 }).notNull(),
});

export const reactions = pgTable("reactions", {
	reactionId: varchar("reaction_ID").primaryKey().notNull(),
	message: varchar().notNull(),
	userId: varchar("user_ID").notNull(),
	emoji: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "reactions___user"
		}),
	foreignKey({
			columns: [table.message],
			foreignColumns: [comment.commentId],
			name: "reactions_comment_comment_id_fk"
		}),
]);

export const salary = pgTable("salary", {
	salaryId: varchar("salary_ID").primaryKey().notNull(),
	userId: varchar("user_ID").notNull(),
	amount: numeric({ precision: 10, scale:  4 }).notNull(),
	teamId: varchar("team_ID").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [team.teamId],
			name: "team_ID"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_id"
		}),
]);

export const teamRoles = pgTable("team_roles", {
	roleName: varchar("role_name", { length: 320 }).notNull(),
	roleId: varchar("role_ID").primaryKey().notNull(),
	userId: varchar("user_ID"),
	teamId: varchar("team_ID").notNull(),
	permissions: varchar().notNull(),
	description: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [team.teamId],
			name: "team_id"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_id"
		}),
]);

export const userPicker = pgTable("user_picker", {
	userPickerId: varchar("user_picker_ID").primaryKey().notNull(),
	customField: varchar("custom_field").notNull(),
	enabled: boolean().default(false).notNull(),
	config: varchar().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.customField],
			foreignColumns: [customField.customFieldId],
			name: "user_picker_custom_field_custom_field_id_fk"
		}),
]);

export const userPickerGroup = pgTable("user_picker_group", {
	userPickerGroupId: varchar("user_picker_group_ID").primaryKey().notNull(),
	filter: varchar().notNull(),
	groupname: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.filter],
			foreignColumns: [userPicker.userPickerId],
			name: "user_picker_group_user_picker_user_picker_id_fk"
		}),
]);

export const team = pgTable("team", {
	teamId: varchar("team_ID").notNull(),
	userId: varchar("user_ID").notNull(),
	teamName: varchar("team_name", { length: 320 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "user_ID"
		}),
	primaryKey({ columns: [table.teamId, table.teamId, table.teamId], name: "team_ID"}),
]);

export const issueType = pgTable("issue_type", {
	typeId: varchar("type_ID").notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar(),
	icon: varchar(),
	fields: varchar().notNull(),
	avatar: varchar(),
}, (table) => [
	foreignKey({
			columns: [table.avatar],
			foreignColumns: [avatarTable.avatarId],
			name: "avatar_issue_type"
		}),
	primaryKey({ columns: [table.typeId, table.typeId], name: "type_id"}),
]);

export const projects = pgTable("projects", {
	projectId: varchar("project_ID").notNull(),
	projectLead: varchar("project_lead").notNull(),
	projectName: varchar("project_name", { length: 100 }).notNull(),
	projectType: varchar("project_type").notNull(),
	teamId: varchar("team_ID").notNull(),
	projectKey: varchar("project_key").notNull(),
	avatar: varchar().notNull(),
	url: varchar().notNull(),
	projectCategory: varchar("project_category"),
}, (table) => [
	foreignKey({
			columns: [table.avatar],
			foreignColumns: [avatarTable.avatarId],
			name: "avatar_projects"
		}),
	foreignKey({
			columns: [table.projectType],
			foreignColumns: [projectType.typeId],
			name: "project_type_ID"
		}),
	foreignKey({
			columns: [table.teamId],
			foreignColumns: [team.teamId],
			name: "team_ID"
		}),
	foreignKey({
			columns: [table.projectLead],
			foreignColumns: [users.userId],
			name: "user_ID"
		}),
	primaryKey({ columns: [table.projectId, table.projectId], name: "project_ID"}),
]);

export const issue = pgTable("issue", {
	projectId: varchar("project_ID").notNull(),
	issueId: varchar("issue_ID").notNull(),
	type: varchar().notNull(),
	name: varchar().notNull(),
	summary: varchar(),
	parent: varchar(),
	priority: varchar().notNull(),
	status: varchar().notNull(),
	createdAt: date("created_at").notNull(),
	updatedAt: date("updated_at"),
	url: varchar().notNull(),
	dueAt: timestamp("due_at", { precision: 6, withTimezone: true, mode: 'string' }),
	resolutionAt: timestamp("resolution_at", { precision: 6, withTimezone: true, mode: 'string' }),
	originalEstimateAt: timestamp("original_estimate_at", { precision: 6, withTimezone: true, mode: 'string' }),
	estimateDoneAt: timestamp("estimate_done_at", { precision: 6, withTimezone: true, mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.priority],
			foreignColumns: [priority.priorityId],
			name: "priority"
		}),
	foreignKey({
			columns: [table.projectId],
			foreignColumns: [projects.projectId],
			name: "project_id"
		}),
	foreignKey({
			columns: [table.status],
			foreignColumns: [issueStatus.statusId],
			name: "status"
		}),
	foreignKey({
			columns: [table.type],
			foreignColumns: [issueType.typeId],
			name: "type_id"
		}),
	primaryKey({ columns: [table.issueId, table.issueId], name: "issue_id"}),
]);
