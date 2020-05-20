insert into customer values("Lalita Basil", 9998572210, "CoH46D10", 255.65);
insert into customer values("Trisha Brijesh", 9396572210, "HoLO3A05", 168.44);
insert into customer values("Megha Eda", 7951572310, "CoH46E10", 230.85);
insert into customer values("George Cooper", 2998872214, "AcJW2B03", 255.65);
insert into customer values("Rachel George", 6998572411, "HoLO3A09", 210.24);

insert into movie values("D1006H4TuE", "Comedy", "Housefull 4", 6, 1, "Tuesday", "2020-07-10 18:00:00");
insert into movie values("A0503LOFrM", "Horror", "Lights Out", 3, 3, "Friday", "2020-07-03 00:00:00");
insert into movie values("E1006H4TuE", "Comedy", "Housefull 4", 6, 1, "Tuesday", "2020-07-10 18:00:00");
insert into movie values("B0302JWWeA", "Action", "John Wick", 2, 2, "Wednesday", "2020-07-21 14:30:00");
insert into movie values("A0903LOFrM", "Horror", "Lights Out", 3, 3, "Friday", "2020-07-03 00:00:00");

insert into seat values("6D10", "Normal", 9998572210, "D1006H4TuE");
insert into seat values("3A05", "VIP", 9396572210, "A0503LOFrM");
insert into seat values("6E10", "Normal", 7951572310, "E1006H4TuE");
insert into seat values("2B03", "VIP", 2998872214, "B0302JWWeA");
insert into seat values("3A09", "VIP", 6998572411, "A0903LOFrM");

insert into luxeries values("1P3C", 324.56, 9998572210);
insert into luxeries values("1P2N2D", 400.50, 9396572210);
insert into luxeries values("1P3D", 420.25, 7951572310);
insert into luxeries values("1P3C", 324.56, 6998572411);

insert into popcorn values("L", "Salted", 1, 9998572210);
insert into popcorn values("M", "Caramel", 1, 9396572210);
insert into popcorn values("L", "Salted", 1, 7951572310);
insert into popcorn values("S", "Cheese", 1, 6998572411);

insert into nachos values("Cheese", 2, 9396572210);

insert into chocolate values("Bounty", 3, 6998572411);

insert into drink values("S", "SpCC", 2, 9396572210);
insert into drink values("S", "SpSpMD", 3, 7951572310 );