CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"clearance_level" int NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"pic" varchar(255) NOT NULL,
	"user_active" BOOLEAN NOT NULL
);


CREATE TABLE "client" (
	"client_id" SERIAL PRIMARY KEY NOT NULL,
	"client_first_name" varchar(255) NOT NULL,
	"client_last_name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" int NOT NULL,
	"bio" TEXT,
	"client_active" BOOLEAN NOT NULL
);


CREATE TABLE "user_client" (
	"j_user_id" int NOT NULL,
	"j_client_id" int NOT NULL
);


CREATE TABLE "timesheet" (
	"timesheet_id" SERIAL PRIMARY KEY NOT NULL,
	"t_user_id" int NOT NULL,
	"t_client_id" int NOT NULL,
	"clock_in" TIMESTAMP NOT NULL,
	"loc_1" varchar(255) NOT NULL,
	"work_type" varchar(255) NOT NULL,
	"clock_out" TIMESTAMP,
	"loc_2" varchar(255),
	"notes" TEXT,
	"is_clocked_in" BOOLEAN NOT NULL,
	"notification" BOOLEAN NOT NULL
);

SELECT * FROM "timesheet"
JOIN "client"
ON "timesheet".t_client_id = "client".client_id
JOIN "user_client"
ON "user_client".j_client_id = "client".client_id
JOIN "user"
ON "user_client".j_user_id = "user".id;