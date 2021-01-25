CREATE TABLE FACULTY
  (
   FACULTY      CHAR(10)      NOT NULL,
   FACULTY_NAME VARCHAR(100), 
   CONSTRAINT PK_FACULTY PRIMARY KEY(FACULTY) 
  );
insert into FACULTY   (FACULTY,   FACULTY_NAME )
             values  ('ФИТ',   'Факультет Инф. Тех.');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('ЛСОХ',   'ЛЕСХОЗ');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('ТОВ',     'ХИМИКИ');
insert into FACULTY   (FACULTY,   FACULTY_NAME )
            values  ('ПИМ',     'КТО-то ТАМ');

--------------------------------------------------------------------------------------------
-- DROP TABLE PULPIT
CREATE TABLE PULPIT 
(
 PULPIT       CHAR(20)      NOT NULL,
 PULPIT_NAME  VARCHAR(160), 
 FACULTY      CHAR(10)      NOT NULL, 
 CONSTRAINT FK_PULPIT_FACULTY FOREIGN KEY(FACULTY)   REFERENCES FACULTY(FACULTY), 
 CONSTRAINT PK_PULPIT PRIMARY KEY(PULPIT) 
 ); 
 
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY )
             values  ('ИСИТ',    'Системы и сети ',											         'ФИТ'  );
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY )
             values  ('QQQ', 'QQQ QQQ QQQ', 'ЛСОХ'  );
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
              values  ('ПОИТ',      'Прогр. обесп. инф. техн.',                                                 'ФИТ') ;         
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('WWW',      'WWW WWW WWW',                                                 'ТОВ') ;   
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('EEE',      'EEE EEE EEE',                                              'ЛСОХ');           
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('AAA',   'AAA AAA AAA',                               'ПИМ');                
insert into PULPIT   (PULPIT,    PULPIT_NAME,                                                   FACULTY)
             values  ('SSS',  'SSS SSS SSS','ТОВ');                  
    
------------------------------------------------------------------------------------------------------------------------        - DROP  TABLE TEACHER


CREATE TABLE TEACHER
 ( 
  TEACHER       CHAR(20) NOT  NULL,
  TEACHER_NAME  VARCHAR(80), 
  PULPIT        CHAR(20) NOT NULL, 
  CONSTRAINT PK_TEACHER  PRIMARY KEY(TEACHER), 
  CONSTRAINT FK_TEACHER_PULPIT FOREIGN   KEY(PULPIT)   REFERENCES PULPIT(PULPIT)
 ) ;
 
insert into  TEACHER    (TEACHER,   TEACHER_NAME, PULPIT )
                       values  ('ППП',    'Петров пет петрович',  'ИСИТ');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('ИИИ',    'Иванов Иван Иванович',  'QQQ');
insert into  TEACHER    (TEACHER,  TEACHER_NAME, PULPIT )
                       values  ('ВВВ',    'Васильев Василий Васильевич',  'WWW');

---------------------------------------------------------------------------------------------------------------------
-- DROP TABLE SUBJECT 
CREATE TABLE SUBJECT
    (
     SUBJECT      CHAR(20)     NOT NULL, 
     SUBJECT_NAME VARCHAR(100)  NOT NULL,
     PULPIT       CHAR(20)     NOT NULL,  
     CONSTRAINT PK_SUBJECT PRIMARY KEY(SUBJECT),
     CONSTRAINT FK_SUBJECT_PULPIT FOREIGN  KEY(PULPIT)  REFERENCES PULPIT(PULPIT)
    );

insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('ВРБ',   'Вырубка лесов',                   'QQQ');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT)
                       values ('Node',     'Програмирование кроссю платф. прилож.',                                        'ÈÑèÒ');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('ВАРЕНЬЕ',    'ЗЕЛЬЕВАРЕНЬЕ',                          'WWW');
insert into SUBJECT   (SUBJECT,   SUBJECT_NAME,        PULPIT )
                       values ('БД',  'Базы данных',            'ПОИТ');    
---------------------------------------------------------------------------------------------------------------------
-- DROP TABLE AUDITORIUM_TYPE 
create table AUDITORIUM_TYPE 
(
  AUDITORIUM_TYPE   char(20) constraint AUDITORIUM_TYPE_PK  primary key,  
  AUDITORIUM_TYPENAME  varchar(60) constraint AUDITORIUM_TYPENAME_NOT_NULL not null         
);

delete AUDITORIUM_TYPE;
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('ЛК-К',   'Лекционная с комп.');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('ПЗ',   'Для Пз');
insert into AUDITORIUM_TYPE   (AUDITORIUM_TYPE,   AUDITORIUM_TYPENAME )
                       values  ('ЛК', 'Лекционная');
---------------------------------------------------------------------------------------------------------------------
-- DROP TABLE AUDITORIUM 
create table AUDITORIUM 
(
 AUDITORIUM           char(20) primary key,  -- êîä àóäèòîðèè
 AUDITORIUM_NAME      varchar(300),          -- àóäèòîðèÿ 
 AUDITORIUM_CAPACITY  int,              -- âìåñòèìîñòü
 AUDITORIUM_TYPE      char(20) not null      -- òèï àóäèòîðèè
                      references AUDITORIUM_TYPE(AUDITORIUM_TYPE)  
);

insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('206-1',   '206-1', 'ЛК-К', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY)
                       values  ('301-1',   '301-1', 'ПЗ', 15);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('236-1',   '236-1', 'ПЗ',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('313-1',   '313-1', 'ЛК',   60);
insert into  AUDITORIUM   (AUDITORIUM,   AUDITORIUM_NAME, AUDITORIUM_TYPE, AUDITORIUM_CAPACITY )
                       values  ('324-1',   '324-1', 'ЛК-К',   50);


select * from TEACHER;
