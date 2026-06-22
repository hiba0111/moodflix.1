CREATE TABLE `moodHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mood` varchar(100) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `moodHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `movieRecommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mood` varchar(100) NOT NULL,
	`movies` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `movieRecommendations_id` PRIMARY KEY(`id`)
);
