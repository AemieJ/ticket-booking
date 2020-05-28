insert into customer values("Lalita Basil", 9998572210, "CoH41D10", 255.65);
insert into customer values("Trisha Brijesh", 9396572810, "HoLO2A05", 168.44);
insert into customer values("Megha Eda", 7951572310, "CoH41E10", 230.85);
insert into customer values("George Cooper", 2998872214, "AcJW3B03", 255.65);
insert into customer values("Rachel George", 6998572411, "HoLO2A09", 210.24);

insert into movie values("D101H4TuE", "Comedy", "Housefull 4", 1, 1, "Tuesday", "2020-05-10 18:00:00");
insert into movie values("A052LOFrN", "Horror", "Lights Out", 2, 3, "Friday", "2020-05-03 00:00:00");
insert into movie values("E101H4TuE", "Comedy", "Housefull 4", 1, 1, "Tuesday", "2020-05-10 18:00:00");
insert into movie values("B033JWWeA", "Action", "John Wick", 3, 2, "Wednesday", "2020-05-21 14:30:00");
insert into movie values("A092LOFrN", "Horror", "Lights Out", 2, 3, "Friday", "2020-05-03 00:00:00");

insert into seat values("1D10", "Normal", 9998572210, "D101H4TuE");
insert into seat values("2A05", "VIP", 9396572810, "A052LOFrN");
insert into seat values("1E10", "Normal", 7951572310, "E101H4TuE");
insert into seat values("3B03", "VIP", 2998872214, "B033JWWeA");
insert into seat values("2A09", "VIP", 6998572411, "A092LOFrN");

insert into luxeries values("1P3C2210", 324.56, 9998572210);
insert into luxeries values("1P2N2D2810", 400.50, 9396572810);
insert into luxeries values("1P3D2310", 420.25, 7951572310);
insert into luxeries values("1P3C2411", 324.56, 6998572411);

insert into popcorn values("L", "Salted", 1, 9998572210);
insert into popcorn values("M", "Caramel", 1, 9396572810);
insert into popcorn values("L", "Salted", 1, 7951572310);
insert into popcorn values("S", "Cheese", 1, 6998572411);

insert into nachos values("Cheese", 2, 9396572810);

insert into chocolate values("Bounty", 3, 6998572411);

insert into drink values("S", "Sprite", 2, 9396572810);
insert into drink values("S", "Mountain Dew", 3, 7951572310);