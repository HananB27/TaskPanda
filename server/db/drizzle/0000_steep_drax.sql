-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collaborators" (
	"collaborators_ID" varchar PRIMARY KEY NOT NULL,
	"project_ID" varchar NOT NULL,
	"user_ID" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collaborator_roles" (
	"collaborator_roles_ID" varchar PRIMARY KEY NOT NULL,
	"collaborator_group_ID" varchar NOT NULL,
	"name" varchar NOT NULL,
	"permissions" integer NOT NULL,
	"description" varchar,
	"user_ID" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"username" varchar(64) NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL,
	"email" varchar(320) NOT NULL,
	"password" varchar NOT NULL,
	"created_date" date NOT NULL,
	"user_ID" varchar PRIMARY KEY NOT NULL,
	"updated_date" varchar,
	"is_active" boolean DEFAULT false NOT NULL,
	"last_active" timestamp(6) with time zone NOT NULL,
	"avatar" varchar
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"comment_ID" varchar PRIMARY KEY NOT NULL,
	"content" varchar,
	"creator" varchar NOT NULL,
	"created_at" timestamp(6) with time zone NOT NULL,
	"reaction" varchar,
	"issue_ID" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_field" (
	"custom_field_ID" varchar PRIMARY KEY NOT NULL,
	"issue_type" varchar NOT NULL,
	"field_key" varchar NOT NULL,
	"field_type" varchar NOT NULL,
	"description" varchar,
	"field_name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_field_option" (
	"option_ID" varchar PRIMARY KEY NOT NULL,
	"custom_field" varchar NOT NULL,
	"config" varchar NOT NULL,
	"parent_option_ID" varchar,
	"enabled" boolean DEFAULT false NOT NULL,
	"order_number" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom_field_value" (
	"custom_field_value_ID" varchar PRIMARY KEY NOT NULL,
	"issue" varchar NOT NULL,
	"custom_field" varchar NOT NULL,
	"updated" varchar,
	"parent_key" varchar,
	"string_value" varchar,
	"number_value" integer,
	"text_value" varchar,
	"date_value" date
);
--> statement-breakpoint
CREATE TABLE "priority" (
	"priority_ID" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"avatar" varchar NOT NULL,
	"color" varchar DEFAULT '#FFFF00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "issue_status" (
	"status_ID" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"avatar" varchar,
	"color" varchar DEFAULT '#FFFFFF' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "avatar_table" (
	"avatar_ID" varchar PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"owner" varchar NOT NULL,
	"content_type" varchar NOT NULL,
	"owner_type" varchar
);
--> statement-breakpoint
CREATE TABLE "project_type" (
	"type_ID" varchar PRIMARY KEY NOT NULL,
	"type_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reactions" (
	"reaction_ID" varchar PRIMARY KEY NOT NULL,
	"message" varchar NOT NULL,
	"user_ID" varchar NOT NULL,
	"emoji" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "salary" (
	"salary_ID" varchar PRIMARY KEY NOT NULL,
	"user_ID" varchar NOT NULL,
	"amount" numeric(10, 4) NOT NULL,
	"team_ID" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_roles" (
	"role_name" varchar(320) NOT NULL,
	"role_ID" varchar PRIMARY KEY NOT NULL,
	"user_ID" varchar,
	"team_ID" varchar NOT NULL,
	"permissions" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_picker" (
	"user_picker_ID" varchar PRIMARY KEY NOT NULL,
	"custom_field" varchar NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"config" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_picker_group" (
	"user_picker_group_ID" varchar PRIMARY KEY NOT NULL,
	"filter" varchar NOT NULL,
	"groupname" varchar
);
--> statement-breakpoint
CREATE TABLE "team" (
	"team_ID" varchar NOT NULL,
	"user_ID" varchar NOT NULL,
	"team_name" varchar(320) NOT NULL,
	CONSTRAINT "team_ID" PRIMARY KEY("team_ID","team_ID","team_ID")
);
--> statement-breakpoint
CREATE TABLE "issue_type" (
	"type_ID" varchar NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar,
	"icon" varchar,
	"fields" varchar NOT NULL,
	"avatar" varchar,
	CONSTRAINT "type_id" PRIMARY KEY("type_ID","type_ID")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"project_ID" varchar NOT NULL,
	"project_lead" varchar NOT NULL,
	"project_name" varchar(100) NOT NULL,
	"project_type" varchar NOT NULL,
	"team_ID" varchar NOT NULL,
	"project_key" varchar NOT NULL,
	"avatar" varchar NOT NULL,
	"url" varchar NOT NULL,
	"project_category" varchar,
	CONSTRAINT "project_ID" PRIMARY KEY("project_ID","project_ID")
);
--> statement-breakpoint
CREATE TABLE "issue" (
	"project_ID" varchar NOT NULL,
	"issue_ID" varchar NOT NULL,
	"type" varchar NOT NULL,
	"name" varchar NOT NULL,
	"summary" varchar,
	"parent" varchar,
	"priority" varchar NOT NULL,
	"status" varchar NOT NULL,
	"created_at" date NOT NULL,
	"updated_at" date,
	"url" varchar NOT NULL,
	"due_at" timestamp(6) with time zone,
	"resolution_at" timestamp(6) with time zone,
	"original_estimate_at" timestamp(6) with time zone,
	"estimate_done_at" timestamp(6) with time zone,
	CONSTRAINT "issue_id" PRIMARY KEY("issue_ID","issue_ID")
);
--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "project_ID" FOREIGN KEY ("project_ID") REFERENCES "public"."projects"("project_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborators" ADD CONSTRAINT "user_ID" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborator_roles" ADD CONSTRAINT "collaborator_group_id" FOREIGN KEY ("collaborator_group_ID") REFERENCES "public"."collaborators"("collaborators_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborator_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment___creator" FOREIGN KEY ("creator") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "issue_id" FOREIGN KEY ("issue_ID") REFERENCES "public"."issue"("issue_ID") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_field" ADD CONSTRAINT "custom_field_issue_type_type_id_fk" FOREIGN KEY ("issue_type") REFERENCES "public"."issue_type"("type_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_field_option" ADD CONSTRAINT "custom_field_option_custom_field_custom_field_id_fk" FOREIGN KEY ("custom_field") REFERENCES "public"."custom_field"("custom_field_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_field_value" ADD CONSTRAINT "custom_field_value___custom_field" FOREIGN KEY ("custom_field") REFERENCES "public"."custom_field"("custom_field_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_field_value" ADD CONSTRAINT "custom_field_value___issue" FOREIGN KEY ("issue") REFERENCES "public"."issue"("issue_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_status" ADD CONSTRAINT "avatar" FOREIGN KEY ("avatar") REFERENCES "public"."avatar_table"("avatar_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions___user" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_comment_comment_id_fk" FOREIGN KEY ("message") REFERENCES "public"."comment"("comment_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary" ADD CONSTRAINT "team_ID" FOREIGN KEY ("team_ID") REFERENCES "public"."team"("team_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salary" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_roles" ADD CONSTRAINT "team_id" FOREIGN KEY ("team_ID") REFERENCES "public"."team"("team_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_roles" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_picker" ADD CONSTRAINT "user_picker_custom_field_custom_field_id_fk" FOREIGN KEY ("custom_field") REFERENCES "public"."custom_field"("custom_field_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_picker_group" ADD CONSTRAINT "user_picker_group_user_picker_user_picker_id_fk" FOREIGN KEY ("filter") REFERENCES "public"."user_picker"("user_picker_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "user_ID" FOREIGN KEY ("user_ID") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue_type" ADD CONSTRAINT "avatar_issue_type" FOREIGN KEY ("avatar") REFERENCES "public"."avatar_table"("avatar_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "avatar_projects" FOREIGN KEY ("avatar") REFERENCES "public"."avatar_table"("avatar_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "project_type_ID" FOREIGN KEY ("project_type") REFERENCES "public"."project_type"("type_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "team_ID" FOREIGN KEY ("team_ID") REFERENCES "public"."team"("team_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "user_ID" FOREIGN KEY ("project_lead") REFERENCES "public"."users"("user_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "priority" FOREIGN KEY ("priority") REFERENCES "public"."priority"("priority_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "project_id" FOREIGN KEY ("project_ID") REFERENCES "public"."projects"("project_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "status" FOREIGN KEY ("status") REFERENCES "public"."issue_status"("status_ID") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "type_id" FOREIGN KEY ("type") REFERENCES "public"."issue_type"("type_ID") ON DELETE no action ON UPDATE no action;
*/