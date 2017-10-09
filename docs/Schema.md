# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `email`           | string    | not null, unique |
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

+ `users` have many `dreams`

## `dreams`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `body`              | text    | not null                       |
| `audio_url`            | string    | not null                       |
| `user_id`          | integer   | not null, foreign key |
| `created_at`         | datetime  | not null, indexed                      |
| `updated_at`         | datetime  | not null                       |

+ `dreams` belong to a `user`
+ `projects` have many `notes`

## `notes`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `body`              | text    | not null                       |
| `dream_id`         | integer   | not null, foreign key |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `notes` belong to a `dream`

## `keywords`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `word`            | string    | not null                       |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `keywords` have many `taggings`

## `taggings`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `keyword_id`            | integer    | not null       , foreign key                |
| `dream_id`            | integer    | not null                      , foreign key |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `taggings` belong to a `keyword`
+ `taggings` belong to a `dream`
+ `taggings` indexed uniquely on 'dream_id' and 'keyword_id'

## `alarms`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `user_id`            | integer    | not null, foreign key                  |
| `time`            | time object?    | not null key                  |
| `days`            | array    | not null                  |
| `enabled`            | boolean    | not null, default: true key                  |
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ `keywords` have many `taggings`
