-- REL FK: HistoriccarToCar [rel5#role9]
alter table `historic_car`   add index fk_car_historic_car (`day`, `crosswalk_oid`), add constraint fk_car_historic_car foreign key (`day`, `crosswalk_oid`) references `historic_car` (`day`, `crosswalk_oid`);


-- REL FK: HistoriccarToCrosswalk [rel6#role11]
alter table `historic_car`   add index fk_crosswalk_historic_car (`day`, `crosswalk_oid`), add constraint fk_crosswalk_historic_car foreign key (`day`, `crosswalk_oid`) references `historic_car` (`day`, `crosswalk_oid`);


