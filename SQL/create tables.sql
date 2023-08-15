





-- 



-- 
-- -- 
--  DROP table review;
-- DROP table payments;
-- DROP Table trip_history;
-- DROP table running_trip;
-- DROP table trip_request;
--  DROP table users;
--  DROP Table pricing_plan;
--  DROP TABLE availability;
--  DROP table driver;
--  DROP table wallet;
-- DROP TABLE vehicle;
--  DROP TABLE MODEL;
-- DROP TABLE LOCATION ;
-- 
--1
create TABLE LOCATION (
    ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    Name        VARCHAR2(100) NOT NULL,
		latitude NUMBER  NOT NULL ,
		longitude NUMBER  NOT NULL,
		--city VARCHAR2(30),
		--country VARCHAR2(30),
		constraint LOCATION_LATITUDE_CHECK check(latitude>=-180 and latitude<=180),
    constraint LOCATION_LONGITUDE_CHECK CHECK (LONGITUDE>=-180 AND LONGITUDE<=180),
    CONSTRAINT location_pk primary key (ID)
);
--2
create table model(
	name  VARCHAR2(100),
	v_type VARCHAR2(50)  NOT NULL,
	manufacturer VARCHAR2(50) NOT NULL,
	 CONSTRAINT model_pk PRIMARY KEY(name),
	 CONSTRAINT MODEL_TYPE_CHECK CHECK(upper(V_TYPE) in('CAR','BIKE','CNG','MICROBUS'))

);
--3
CREATE TABLE vehicle(
	plate_NO CHAR(20),
	modelname VARCHAR2(50) NOT NULL ,
	plan_id number,
	
	constraint vehicle_pk PRIMARY KEY(plate_NO),
	--constraint modelname_unique ,
	constraint vehicle_model_fk Foreign key(modelname) references model(name) 
	--ON DELETE SET NULL
--ON UPDATE CASCADE
	
	);
	--4
	CREATE table driver(
		 ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    Name        VARCHAR2(100) NOT NULL,
    password    VARCHAR2(1024) NOT NULL,
		EMAIL VARCHAR2 ( 255 ) NOT NULL UNIQUE ,
		 PHONE VARCHAR(20) NOT NULL UNIQUE ,
		 SEX CHAR(1) ,
		 plate_no CHAR(20) UNIQUE ,
		 loc_id NUMBER ,
		 rating NUMBER DEFAULT 0,
		 
    CONSTRAINT driver_pk primary key (ID),
		
		constraint driver_vehicle_fk Foreign key(plate_no) references vehicle(plate_no) ON DELETE SET NULL ,
--ON UPDATE CASCADE,
		constraint driver_location_fk Foreign key(loc_id) references Location(id) ON DELETE SET NULL,
		CONSTRAINT DRIVER_EMAIL_CHECK CHECK (REGEXP_LIKE(Email, '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'i')),
		CONSTRAINT DRIVER_PHONE_CHECK CHECK(REGEXP_LIKE(PHONE,'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
		CONSTRAINT DRIVER_SEX_CHECK CHECK (SEX in ('M', 'F')) 
		
--ON UPDATE CASCADE
	);
--5
CREATE TABLE availability(
	d_id NUMBER,
	is_available NUMBER,
	last_updated TIMESTAMP,
	
	constraint availability_pk primary Key(d_id),
	constraint availability_driver_fk  foreign key(d_id) references driver(id) on DELETE CASCADE
	

);
--6
CREATE Table pricing_plan(
		 ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
		 base_fare NUMBER,
		 per_dist NUMBER,
		 per_minute NUMBER,
		 
		 constraint pricing_plan_pk primary key(id)
		 
	

);
--7
create table wallet(
ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1)  ,
balance NUMBER  default 0.0,
account_no NUMBER NOT NULL UNIQUE,
password varchar2(1024) NOT NULL,
		 constraint wallet_pk primary key(id)
		 
	

);
--8
create table users(
			-- ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    username    VARCHAR2(100) NOT NULL,
    password    VARCHAR2(1024) NOT NULL,
		EMAIL VARCHAR2 ( 255 ) NOT NULL UNIQUE ,
		 PHONE VARCHAR(20) NOT NULL UNIQUE ,
		 SEX CHAR(1) ,
		 
		 loc_id NUMBER ,
		 is_admin NUMBER NOT NULL,
		 
    CONSTRAINT users_pk primary key (username),
		
		
		constraint users_location_fk Foreign key(loc_id) references Location(id) on DELETE set null,
			CONSTRAINT USERS_EMAIL_CHECK CHECK (REGEXP_LIKE(Email, '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'i')),
		CONSTRAINT USERS_PHONE_CHECK CHECK(REGEXP_LIKE(PHONE,'^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')),
		CONSTRAINT USERS_SEX_CHECK CHECK (SEX in ('M', 'F')) 


);
--9
create table trip_request(
	ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
	    username    VARCHAR2(100) NOT NULL,
			time_request TIMESTAMP NOT NULL,
			offered_price NUMBER,
			--pickup,dropoff are LOC_id 
			pick_up NUMBER NOT NULL,
			drop_off NUMBER NOT NULL,
			
			constraint trip_request_pk  primary key(id),
			constraint trip_request_users_fk  foreign key(username) references users(username) on DELETE cascade,
			constraint pick_location_fk Foreign key(pick_up) references Location(id) on DELETE cascade,
			constraint drop_location_fk Foreign key(drop_off) references Location(id) on DELETE cascade

);
--10
create table running_trip(

	tr_id NUMBER,
	d_id NUMBER,
	start_time timestamp NOT NULL,
	finish_time timestamp ,
	constraint running_trip_pk PRIMARY KEY(tr_id,d_id)


);
--11 check this table,i am confused
create Table trip_history(
	
	tr_ID          NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
	    username    VARCHAR2(100) NOT NULL,
			start_time TIMESTAMP NOT NULL,
			finish_time timestamp NOT NULL ,
			
			--pickup,dropoff are LOC_id 
			pick_up NUMBER NOT NULL,
			drop_off NUMBER NOT NULL,
			review_id NUMBER,
			plate_no CHAR(20) NOT NULL,
			
			
			
			
			constraint trip_history_pk  primary key(tr_id),
			constraint trip_history_users_fk  foreign key(username) references users(username) ,
			constraint trip_history_vehicle_fk  foreign key(plate_no) references vehicle(plate_no),
			constraint th_pick_location_fk Foreign key(pick_up) references Location(id),
			constraint th_drop_location_fk Foreign key(drop_off) references Location(id)
			
			
	
	
	
);
--12
CREATE table payments(
	transaction_no char(20),
	amount NUMBER,
	payment_time timestamp,
	tr_id NUMBER UNIQUE,
	plan_id NUMBER,
	
	constraint payments_pk primary key(transaction_no),
	constraint payments_trip_fk foreign key(tr_id) references trip_history(tr_id),
	constraint payments_plan_fk foreign key(plan_id) references pricing_plan(ID)
	
	
);
--13
create table review(
	ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
	rating NUMBER,
	description VARCHAR2(1024),
	tr_id NUMBER UNIQUE,
	
	constraint review_pk primary key(ID),
	constraint review_triph_fk foreign key(tr_id) references trip_history(tr_id) on DELETE cascade
	
);

---
alter table users
add  wallet_id NUMBER;
--
 alter table users
add constraint user_wallet_fk foreign key(wallet_id) references wallet(id);
--
alter table driver
add  wallet_id NUMBER;
alter table driver
add constraint driver_wallet_fk foreign key(wallet_id) references wallet(id);


alter table running_trip
add constraint running_trips_driver_fk foreign key(d_id) references driver(id) on DELETE set null;

alter table USERS
DROP constraint USERS_phone_check;

alter table DRIVER
DROP constraint driver_phone_check;

ALTER TABLE DRIVER
ADD CONSTRAINT chk_phone_format
CHECK (
    (TO_CHAR(phone) LIKE '88017%' OR
    TO_CHAR(phone) LIKE '88018%' OR
TO_CHAR(phone) LIKE '88016%' OR
TO_CHAR(phone) LIKE '88015%' OR
TO_CHAR(phone) LIKE '88013%' OR
TO_CHAR(phone) LIKE '88014%' OR
    TO_CHAR(phone) LIKE '88019%')
		AND (LENGTH(TO_CHAR(phone))=13)
);


ALTER TABLE USERS
ADD CONSTRAINT users_chk_phone_format
CHECK (
    (TO_CHAR(phone) LIKE '88017%' OR
    TO_CHAR(phone) LIKE '88018%' OR
TO_CHAR(phone) LIKE '88016%' OR
TO_CHAR(phone) LIKE '88015%' OR
TO_CHAR(phone) LIKE '88013%' OR
TO_CHAR(phone) LIKE '88014%' OR
    TO_CHAR(phone) LIKE '88019%')
		AND (LENGTH(TO_CHAR(phone))=13)
);

alter table USERS
DROP constraint USERS_email_check;

alter table DRIVER
DROP constraint driver_email_check;

-- alter table USERS
-- drop constraint users_chk_phone_format;
-- 
-- alter table DRIVER
-- drop constraint chk_phone_format;

alter TABLE VEHICLE
add ID        NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ;


alter table USERS
add NAME char(100);



-- 
-- ALTER TABLE DRIVER
-- ADD CONSTRAINT driver_chk_email_format
-- CHECK (
--     email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'
-- );
-- 
-- 
-- ALTER TABLE DRIVER
-- ADD CONSTRAINT driver_chk_email_format
-- CHECK (
--     email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
-- );
-- 
-- ALTER TABLE USERS
-- ADD CONSTRAINT user_chk_email_format
-- CHECK (
--     email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
-- );
-- 
-- 
-- 
-- 
-- 