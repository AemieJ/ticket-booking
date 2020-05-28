create table customer (
    customer_name varchar(20) not null,
    phone_no bigint primary key,
    ticket_no char(12) not null,
    total_payment double precision not null
);  

create table movie (
    movie_id varchar(15) primary key,
    genre varchar(15) not null,
    movie_name varchar(20) not null,
    room_no int not null,
    type_of_cinema int not null,
    day_of_show char(10) not null,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table seat (
    seat_no char(4) primary key,
    type_of_seat varchar(6) not null,
    phone_no bigint,
    movie_id varchar(15),
    foreign key (phone_no) references customer(phone_no),
    foreign key (movie_id) references movie(movie_id)
);

create table luxeries (
    id_luxery varchar(12),
    payment_luxery double precision,
    phone_no bigint
);

create table popcorn (
    size char(1),
    type_of_popcorn varchar(15),
    qty int,
    phone_no bigint

);

create table nachos (
    type_of_nachos varchar(8),
    qty int,
    phone_no bigint
);

create table chocolate (
    type_of_chocolate varchar(8),
    qty int,
    phone_no bigint
);

create table drink (
    size char(1),
    type_of_drink varchar(15),
    qty int,
    phone_no bigint
);