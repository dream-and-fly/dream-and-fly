DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  date VARCHAR(255),
  title VARCHAR(255),
  author VARCHAR(255),
  image VARCHAR(255),
  description TEXT
);

DROP TABLE IF EXISTS articlesforcustmor;
CREATE TABLE articlesforcustmor (
  id integer PRIMARY KEY
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
   city VARCHAR(86), 
  date VARCHAR(255),
  title VARCHAR(255),
  author VARCHAR(255),
  rating NUMERIC,
  description TEXT
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  UNIQUE (email)
);



INSERT INTO reviews (city, date, title, author, description,rating) 
VALUES('amman','14/5/2021', 'Amman is a beutiful city', 'Abdullah', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','2');
INSERT INTO reviews (city, date, title, author, description,rating) 
VALUES('amman','14/5/2021', 'Amman is a beutiful city', 'Abdullah', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','3');
INSERT INTO reviews (city, date, title, author, description,rating) 
VALUES('amman','14/5/2021', 'Amman is a beutiful city', 'Abdullah', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','5');
INSERT INTO reviews (city, date, title, author, description,rating) 
VALUES('oslo','14/5/2021', 'Oslo is a beutiful city', 'Abo Ibrahim', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).','1');


INSERT INTO articlesforcustmor (id) VALUES (1);
INSERT INTO articlesforcustmor (id) VALUES (2);
INSERT INTO articlesforcustmor (id) VALUES (3);



INSERT INTO articles (date, title, author, image, description) 
VALUES('25/04/2021','Green bailouts: relying on carbon offsetting will let polluting airlines off the hook','Ben Christopher Howard','https://image.freepik.com/free-vector/airplane-flying-bridge-night_1308-26159.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('27/04/2021','Grounded aircraft could make weather forecasts less reliable','Matthew Blackett','https://qph.fs.quoracdn.net/main-qimg-f3b5ae011170c7abd9827fcf033f2c72','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('22/04/2021','Plane, train, or automobile? The climate impact of transport is surprisingly complicated','Laurie Wright','https://cdn.pixabay.com/photo/2013/08/06/19/13/plane-170272_1280.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('February 14, 2020 2.23am AEDT','Climate change means longer take-offs and fewer passengers per aeroplane – new study','Guy Gratton','https://cdn.pixabay.com/photo/2016/11/23/14/42/aircraft-1853293_1280.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('October 25, 2019 9.23pm AEDT ','Flight shame: flying less plays a small but positive part in tackling climate change','Jan Ditzen','https://cdn.pixabay.com/photo/2019/12/22/07/07/nature-4711920_1280.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('August 28, 2019 9.48pm AEST','Why would anyone want to sit on a plane for over 18 hours? An economist takes the world’s longest flight','Jay L. Zagorsky','https://cdn.pixabay.com/photo/2013/03/02/17/38/sky-89348_1280.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');

INSERT INTO articles (date, title, author, image, description) 
VALUES('August 23, 2019 2.16am AEST','Travel the world without destroying it – Imagine newsletter #5','Ben Christopher Howard','https://cdn.pixabay.com/photo/2015/09/05/20/11/jet-planes-924978_1280.jpg','The coronavirus pandemic has grounded thousands of aircraft, contributing to the largest-ever annual fall in CO₂ emissions. At some point though, the planes will soar again and with them, global emissions.
Most airlines in the UK have committed to achieving net zero carbon emissions by 2050. From 2026, it will become mandatory for airlines worldwide to ensure that their annual emissions stay flat. But the UK aviation industry also plans to increase the number of passengers it serves by 70% in the next three decades.
To pull this off, airlines will be planning to fly planes at or near full passenger capacity and use cleaner burning fuels. But the rest of the emissions airlines hope to cut – between one-third and half of the total – are expected to come from market-based measures, such as carbon offsetting and emissions trading.
You’ve probably encountered an option to offset your carbon footprint when buying a flight. The payment page of Ryanair’s website suggested a “carbon offset contribution” of £2 for a return flight from Gatwick to Alicante. Airlines seeking government bailouts are likely to use carbon offsetting and emissions trading to show they’re serious about putting their emissions on a downward trajectory. But what do they involve and are they really a solution to climate change?');