SHOW DATABASES;

-- ----___messages___---- --
CREATE TABLE if not exists `messages` (
	`id` INT unsigned not null AUTO_INCREMENT,
	`loginID` INT unsigned not null,
	`message` VARCHAR(200),
	`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	primary key (`id`),
	KEY `idx_fk_loginID` (`message`),
  	CONSTRAINT `fk_messages_loginID` FOREIGN KEY (`loginID`) REFERENCES `users` (`id`)  ON UPDATE cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `messages` (`loginID`, `message`)
		values ('1', 'password asd asd'),
				('1', 'password2 asd');


-- ----___USERS___---- --
CREATE TABLE if not exists `users` (
	`id` INT unsigned not null AUTO_INCREMENT,
	`login` VARCHAR(256) UNIQUE,
	`password` VARCHAR(256),
	`admin` BOOLEAN not null default 0,
	`status` BOOLEAN,
	`mute` BOOLEAN not null default 0,
	`ban` BOOLEAN not null default 0,
	primary key (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`login`, `password`, `status`, `mute`, `ban`, `admin`)
		values ('login1', 'password', true, false, false, true),
				('login2', 'password2', false, false, false, false);


select
    `test_chat`.`messages`.`id` AS `id`,
    `test_chat`.`messages`.`message` AS `text`,
    `test_chat`.`users`.`login` AS `author`,
    `test_chat`.`messages`.`date` AS `date`
from
    (
        `test_chat`.`messages`
    left join `test_chat`.`users` on
        (
            (
                `test_chat`.`users`.`id` = `test_chat`.`messages`.`loginID`
            )
        )
    )