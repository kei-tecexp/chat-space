# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false|
|email|varchar|null: false|
|encrypted_password|varchar|null: false|

### Association
has_many :members
has_many :messages, through: : members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false|

### Association

has_many :members
has_many :messages, through: : members


## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
