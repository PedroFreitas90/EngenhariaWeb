CREATE DEFINER=`root`@`localhost` FUNCTION `distance`(latA float,latB float,longA float,longB float) RETURNS float
BEGIN
Declare distance float;
   select ST_Distance_Sphere(
    point(longA,latA),
    point(longB,latB)
) into distance;   
RETURN distance;
END






CREATE DEFINER=`root`@`localhost` PROCEDURE `closerCar`(in cross_id int ,in car_id int )
BEGIN

DECLARE Erro bool default 0;
declare continue handler for sqlexception set Erro=1;

select c.latitude into @latA from car c where c.oid =car_id;
select c.longitude into @longA from car c where c.oid =car_id;


select c.latitude into @latB from crosswalk c where c.oid =cross_id;
select c.longitude into @longB from crosswalk c where c.oid =cross_id;

select `SPWS`.`distance`(@latA,@latB,@longA,@longB) into @distance;
	
    if(@distance <10) then
    Start  Transaction;
    INSERT INTO crosswalk_car(crosswalk_oid,car_oid,distance,day)
	VALUES(cross_id,car_id,@distance,current_date());
	
    if Erro
    then rollback;
    else commit;
    end if;

    start transaction;
    INSERT INTO historic_car(day,crosswalk_oid,car_oid)
    VALUES(current_date(),cross_id,car_id);
    if Erro
    then rollback;
    else commit;
    end if;
end if;
end
















CREATE DEFINER=`root`@`localhost` PROCEDURE `closerPedestrian`(in cross_id int ,in ped_id int )
BEGIN

DECLARE Erro bool default 0;
declare continue handler for sqlexception set Erro=1;

select c.latitude into @latA from pedestrian c where c.oid =ped_id;
select c.longitude into @longA from pedestrian c where c.oid =ped_id;


select c.latitude into @latB from crosswalk c where c.oid =cross_id;
select c.longitude into @longB from crosswalk c where c.oid =cross_id;

select `SPWS`.`distance`(@latA,@latB,@longA,@longB) into @distance;
	
    if(@distance <10) then
    Start  Transaction;
    INSERT INTO pedestrian_crosswalk(pedestrian_oid,crosswalk_oid,distance,day)
	VALUES(ped_id,cross_id,@distance,current_date());
	
    if Erro
    then rollback;
    else commit;
    end if;
start transaction;
    INSERT INTO historic_pedestrian(day,crosswalk_oid,pedestrian_oid)
    VALUES(current_date(),cross_id,ped_id);
    if Erro
    then rollback;
    else commit;
    end if;
end if;
end





CREATE DEFINER=`root`@`localhost` PROCEDURE `closerCars`(in cross_id int)
BEGIN
DECLARE x  int default 1;

truncate table crosswalk_car;

select count(*) into @countC from car;

	cross_loop: LOOP
    
		IF @countC < x then
			leave cross_loop;
        end if;
       call closerCar(cross_id,x);
       
       SET x= x+1;
       
       end loop;
       
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `closerPedestrians`(in cross_id int)
BEGIN
DECLARE x  int default 1;

truncate table pedestrian_crosswalk;

select count(*) into @countC from pedestrian;

	cross_loop: LOOP
    
		IF @countC < x then
			leave cross_loop;
        end if;
       call closerPedestrian(cross_id,x);
       
       SET x= x+1;
       
       end loop;
       
END







