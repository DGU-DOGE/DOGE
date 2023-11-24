DROP TABLE IF EXISTS `favorite` CASCADE;
DROP TABLE IF EXISTS `book` CASCADE;
DROP TABLE IF EXISTS `member` CASCADE;
DROP TABLE IF EXISTS `bookshelf` CASCADE;
DROP TABLE IF EXISTS `book_shelf_relation` CASCADE;
DROP TABLE IF EXISTS `auth_number` CASCADE;

CREATE TABLE `favorite`
(
    `member_id` bigint NOT NULL,
    `book_id`   bigint NOT NULL
);

CREATE TABLE `book`
(
    `book_id`     bigint       NOT NULL,
    `call_number` VARCHAR(255) NOT NULL,
    `book_name`   VARCHAR(255) NULL,
    `author`      VARCHAR(255) NULL,
    `publisher`   VARCHAR(255) NULL,
    `photo_link`  VARCHAR(255) NULL
);

CREATE TABLE `member`
(
    `member_id`      bigint       NOT NULL,
    `email`          VARCHAR(255) NOT NULL,
    `password`       VARCHAR(255) NOT NULL,
    `favorite_count` int          NOT NULL
);

CREATE TABLE `bookshelf`
(
    `bookshelf_id` bigint NOT NULL,
    `shelf_name`   VARCHAR(255) NULL,
    `floor`        int NULL,
    `number_start` VARCHAR(255) NULL,
    `number_end`   VARCHAR(255) NULL,
    `shelf_count`  int NULL
);

CREATE TABLE `book_shelf_relation`
(
    `book_shelf_id`    bigint NOT NULL,
    `book_id`          bigint NOT NULL,
    `bookshelf_id`     bigint NOT NULL,
    `row`              int NULL,
    `cell`             int NULL,
    `book_shelf_count` int NULL
);

CREATE TABLE `auth_number`
(
    `auth_id`     bigint       NOT NULL,
    `auth_email`  VARCHAR(255) NOT NULL,
    `auth_number` int          NOT NULL,
    `created_at`  date         NOT NULL
);

ALTER TABLE `book`
    ADD CONSTRAINT `PK_BOOK` PRIMARY KEY (
                                          `book_id`
        );

ALTER TABLE `member`
    ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
                                            `member_id`
        );

ALTER TABLE `bookshelf`
    ADD CONSTRAINT `PK_BOOKSHELF` PRIMARY KEY (
                                               `bookshelf_id`
        );

ALTER TABLE `book_shelf_relation`
    ADD CONSTRAINT `PK_BOOK_SHELF_RELATION` PRIMARY KEY (
                                                         `book_shelf_id`,
                                                         `book_id`,
                                                         `bookshelf_id`
        );

ALTER TABLE `auth_number`
    ADD CONSTRAINT `PK_AUTH_NUMBER` PRIMARY KEY (
                                                 `auth_id`
        );

ALTER TABLE `book_shelf_relation`
    ADD CONSTRAINT `FK_book_TO_book_shelf_relation_1` FOREIGN KEY (
                                                                   `book_id`
        )
        REFERENCES `book` (
                           `book_id`
            );

ALTER TABLE `book_shelf_relation`
    ADD CONSTRAINT `FK_bookshelf_TO_book_shelf_relation_1` FOREIGN KEY (
                                                                        `bookshelf_id`
        )
        REFERENCES `bookshelf` (
                                `bookshelf_id`
            );

