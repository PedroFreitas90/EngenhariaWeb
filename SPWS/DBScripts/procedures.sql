DELIMITER $$
CREATE  FUNCTION distance (latA float,latB float,longA float,longB float) RETURNS float
BEGIN
Declare distance float;
   select ST_Distance_Sphere(
    point(longA,latA),
    point(longB,latB)
) into distance;
RETURN distance;
END
$$
DELIMITER $$
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
    SELECT Count(*) into @exist from historic where day = current_date() and crosswalk_oid = cross_id;
    SELECT Count(*) INTO @size from historic;
    SELECT Count(*) into @size2 from historic_car;


    SET @size2 = @size2 +1;

      IF @exist=0 THEN
      SET @size = @size +1;
      INSERT INTO historic(oid,day,crosswalk_oid) VALUES(@size,current_date(),cross_id);
      END if ;

SELECT oid into @oid from historic where day = current_date() and crosswalk_oid = cross_id;
select Count(*) into @exist2 from historic_car where car_oid =car_id and historic_oid = @oid;

      IF @exist2 = 0 then
    INSERT INTO historic_car(oid,historic_oid,car_oid) VALUES(@size2,@oid,car_id);
    END IF;
    if Erro
    then rollback;
    else commit;
    end if;
end if;
end
$$












DELIMITER $$
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

SELECT Count(*) into @exist from historic where day = current_date() and crosswalk_oid = cross_id;
SELECT Count(*) INTO @size from historic;
SELECT Count(*) into @size2 from historic_pedestrian;


SET @size2 = @size2 +1;

  IF @exist=0 THEN
  SET @size = @size +1;
  INSERT INTO historic(oid,day,crosswalk_oid) VALUES(@size,current_date(),cross_id);
  END IF ;

SELECT oid into @oid from historic where day = current_date() and crosswalk_oid = cross_id ;
select Count(*) into @exist2 from historic_pedestrian where pedestrian_oid = ped_id and historic_oid = @oid;

	IF @exist2 = 0 then
		INSERT INTO historic_pedestrian(oid,pedestrian_oid,historic_oid) VALUES(@size2,ped_id,@oid);
	END IF;
    if Erro
    then rollback;
    else commit;
    end if;
end if;
end
$$

DELIMITER $$
CREATE  PROCEDURE closerCars(in cross_id int)
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
 select count(*) into @countP from pedestrian_crosswalk;
 select count(*) into @countC from crosswalk_car;
    IF @countP + @countC > 0 then
    UPDATE crosswalk SET state = "STOP" WHERE oid = cross_id;
 	else
     UPDATE crosswalk SET state = "GO GO GO" WHERE oid = cross_id;
     end IF;   

END

$$
DELIMITER $$
CREATE PROCEDURE closerPedestrians (in cross_id int)
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

 select count(*) into @countP from pedestrian_crosswalk;
 select count(*) into @countC from crosswalk_car;
    IF @countP + @countC > 0 then
    UPDATE crosswalk SET state = "STOP" WHERE oid = cross_id;
 	else
     UPDATE crosswalk SET state = "GO GO GO" WHERE oid = cross_id;
     end IF;       

END
$$
