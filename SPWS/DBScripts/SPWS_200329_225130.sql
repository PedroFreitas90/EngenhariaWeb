-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `email`  varchar(255),
   `password`  varchar(255),
   `username`  varchar(255),
  primary key (`oid`)
);


-- Crosswalk [ent1]
create table `crosswalk` (
   `oid`  integer  not null,
   `latitude`  double precision,
   `longitude`  double precision,
   `state`  varchar(255),
  primary key (`oid`)
);


-- pedestrian [ent2]
create table `pedestrian` (
   `oid`  integer  not null,
   `latitude`  double precision,
   `longitude`  double precision,
  primary key (`oid`)
);


-- Car [ent3]
create table `car` (
   `oid`  integer  not null,
   `latitude`  double precision,
   `longitude`  double precision,
  primary key (`oid`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);
create index `idx_group_module` on `group`(`module_oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);
create index `idx_group_module_group` on `group_module`(`group_oid`);
create index `idx_group_module_module` on `group_module`(`module_oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);
create index `idx_user_group` on `user`(`group_oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);
create index `idx_user_group_user` on `user_group`(`user_oid`);
create index `idx_user_group_group` on `user_group`(`group_oid`);


-- pedestrian_Crosswalk [rel3]
create table `pedestrian_crosswalk` (
   `pedestrian_oid`  integer not null,
   `crosswalk_oid`  integer not null,
   `distance`  float not null,
    `day`  date not null,
        
  primary key (`pedestrian_oid`, `crosswalk_oid`)
   
);
alter table `pedestrian_crosswalk`   add index fk_pedestrian_crosswalk_pedre (`pedestrian_oid`), add constraint fk_pedestrian_crosswalk_pedre foreign key (`pedestrian_oid`) references `pedestrian` (`oid`);
alter table `pedestrian_crosswalk`   add index fk_pedestrian_crosswalk_cross (`crosswalk_oid`), add constraint fk_pedestrian_crosswalk_cross foreign key (`crosswalk_oid`) references `crosswalk` (`oid`);
create index `idx_pedestrian_crosswalk_pedr` on `pedestrian_crosswalk`(`pedestrian_oid`);
create index `idx_pedestrian_crosswalk_cros` on `pedestrian_crosswalk`(`crosswalk_oid`);


-- Crosswalk_Car [rel4]
create table `crosswalk_car` (
   `crosswalk_oid`  integer not null,
   `car_oid`  integer not null,
    `distance`  float not null,
    `day`  date not null,
    
  primary key (`crosswalk_oid`, `car_oid`)
);
alter table `crosswalk_car`   add index fk_crosswalk_car_crosswalk (`crosswalk_oid`), add constraint fk_crosswalk_car_crosswalk foreign key (`crosswalk_oid`) references `crosswalk` (`oid`);
alter table `crosswalk_car`   add index fk_crosswalk_car_car (`car_oid`), add constraint fk_crosswalk_car_car foreign key (`car_oid`) references `car` (`oid`);
create index `idx_crosswalk_car_crosswalk` on `crosswalk_car`(`crosswalk_oid`);
create index `idx_crosswalk_car_car` on `crosswalk_car`(`car_oid`);



create table `historic_car` (
    `day` date not null,
    `crosswalk_oid` integer not null,
    `car_oid` integer not null,

   primary key (`day`, `crosswalk_oid`,`car_oid`)
);
alter table `historic_car`   add index fk_historic_car_crosswalk (`crosswalk_oid`), add constraint fk_historic_car_crosswalk foreign key (`crosswalk_oid`) references `crosswalk` (`oid`);
alter table `historic_car`   add index fk_historic_car_car (`car_oid`), add constraint fk_historic_car_car foreign key (`car_oid`) references `car` (`oid`);
create index `idx_historic_car_crosswalk` on `historic_car`(`crosswalk_oid`);
create index `idx_historic_car_car` on `historic_car`(`car_oid`);



create table `historic_pedestrian` (
    `day` date not null,
    `crosswalk_oid` integer not null,
    `pedestrian_oid` integer not null,

   primary key (`day`, `crosswalk_oid`,`pedestrian_oid`)
);
alter table `historic_pedestrian`   add index fk_historic_pedestrian_crosswalk (`crosswalk_oid`), add constraint fk_historic_pedestrian_crosswalk foreign key (`crosswalk_oid`) references `crosswalk` (`oid`);
alter table `historic_pedestrian`   add index fk_historic_pedestrian_pedestrian (`pedestrian_oid`), add constraint fk_historic_pedestrian_pedestrian foreign key (`pedestrian_oid`) references `pedestrian` (`oid`);
create index `idx_historic_pedestrian_crosswalk` on `historic_pedestrian`(`crosswalk_oid`);
create index `idx_historic_pedestrian_pedestrian` on `historic_pedestrian`(`pedestrian_oid`);


