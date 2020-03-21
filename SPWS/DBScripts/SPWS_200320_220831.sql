-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
) ENGINE=InnoDB;


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
) ENGINE=InnoDB;


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
  primary key (`oid`)
) ENGINE=InnoDB;


-- Crosswalk [ent1]
create table `crosswalk` (
   `oid`  integer  not null,
  primary key (`oid`)
) ENGINE=InnoDB;


-- Pedrestrian [ent2]
create table `pedrestrian` (
   `oid`  integer  not null,
  primary key (`oid`)
) ENGINE=InnoDB;


-- Car [ent3]
create table `car` (
   `oid`  integer  not null,
  primary key (`oid`)
) ENGINE=InnoDB;


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
) ENGINE=InnoDB;


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
) ENGINE=InnoDB;


-- Pedrestrian_Crosswalk [rel3]
create table `pedrestrian_crosswalk` (
   `pedrestrian_oid`  integer not null,
   `crosswalk_oid`  integer not null,
  primary key (`pedrestrian_oid`, `crosswalk_oid`)
) ENGINE=InnoDB;


-- Crosswalk_Car [rel4]
create table `crosswalk_car` (
   `crosswalk_oid`  integer not null,
   `car_oid`  integer not null,
  primary key (`crosswalk_oid`, `car_oid`)
) ENGINE=InnoDB;


