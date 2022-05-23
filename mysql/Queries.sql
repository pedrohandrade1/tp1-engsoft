SET GLOBAL event_scheduler = ON;
SET GLOBAL max_user_connections = 500;
SET GLOBAL max_connections = 500;

CREATE TABLE Student (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    email VARCHAR (50),
    password VARCHAR (50),
    PRIMARY KEY (id)
) ENGINE = innodb;

CREATE TABLE Educator (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    email VARCHAR (50),
    password VARCHAR (50),
    PRIMARY KEY (id)
) ENGINE = innodb;

CREATE TABLE Classroom (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idEducator SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
) ENGINE = innodb;

ALTER TABLE Classroom ADD CONSTRAINT FK_IdEducator FOREIGN KEY (idEducator) REFERENCES Educator (id);

CREATE TABLE Registration (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idClassroom SMALLINT UNSIGNED NOT NULL,
    idStudent SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
) ENGINE = innodb;

ALTER TABLE Registration ADD CONSTRAINT FK_Reg_IdClassroom FOREIGN KEY (idClassroom) REFERENCES Classroom (id);
ALTER TABLE Registration ADD CONSTRAINT FK_Reg_IdStudent FOREIGN KEY (idStudent) REFERENCES Student (id);

CREATE TABLE Quiz (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idClassroom SMALLINT UNSIGNED NOT NULL,
    idEducator SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
) ENGINE = innodb;

ALTER TABLE Quiz ADD CONSTRAINT FK_Quiz_IdClassroom FOREIGN KEY (idClassroom) REFERENCES Classroom (id);
ALTER TABLE Quiz ADD CONSTRAINT FK_Quiz_IdEducator FOREIGN KEY (idEducator) REFERENCES Educator (id);

CREATE TABLE Question (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idQuiz SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (id)
) ENGINE = innodb;

ALTER TABLE Question ADD CONSTRAINT FK_Ques_IdQuiz FOREIGN KEY (idQuiz) REFERENCES Quiz (id);

CREATE TABLE Answer (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idQuiz SMALLINT UNSIGNED NOT NULL,
    idStudent SMALLINT UNSIGNED NOT NULL,
    idQuestion SMALLINT UNSIGNED NOT NULL,
    answerSelected VARCHAR (1),
    PRIMARY KEY (id)
);

ALTER TABLE Answer ADD CONSTRAINT FK_Ans_IdQuiz FOREIGN KEY (idQuiz) REFERENCES Quiz (id);
ALTER TABLE Answer ADD CONSTRAINT FK_Ans_IdStudent FOREIGN KEY (idStudent) REFERENCES Student (id);
ALTER TABLE Answer ADD CONSTRAINT FK_Ans_IdQuestion FOREIGN KEY (idQuestion) REFERENCES Question (id);

SELECT * FROM heroku_65f5ce87b15f505.student;
SELECT * FROM heroku_65f5ce87b15f505.classroom;
SELECT * FROM heroku_65f5ce87b15f505.educator;
SELECT * FROM heroku_65f5ce87b15f505.question;
SELECT * FROM heroku_65f5ce87b15f505.quiz;
SELECT * FROM heroku_65f5ce87b15f505.answer;
SELECT * FROM heroku_65f5ce87b15f505.registration;

INSERT INTO heroku_65f5ce87b15f505.Student
VALUES (1, 'Gabriel', 'Magalhães Monteiro Sales', 'gabriel.sales@dcc.ufmg.br','01234567'),
       (2, 'Jorge Henrique', 'Ferreira da Silva', 'jorge.ferreira@dcc.ufmg.br','12345678'),
       (3, 'Pedro Henrique', 'Andrade', 'pedro.andrade@dcc.ufmg.br','23456789'),
       (4, 'Rita', 'Rezende Borges de Lima', 'rita.lima@dcc.ufmg.br','34567890');

INSERT INTO heroku_65f5ce87b15f505.Educator
VALUES (1, 'João', 'Maria José Silva', 'joão.silva@dcc.ufmg.br','00000000'),
       (2, 'Maria', 'João Silva José', 'maria.josé@dcc.ufmg.br','00000001');

INSERT INTO heroku_65f5ce87b15f505.Classroom
VALUES (1, 2),
       (2, 1);

INSERT INTO heroku_65f5ce87b15f505.Registration
VALUES (1, 1, 1),
       (2, 1, 3),
       (3, 2, 1),
       (4, 2, 2),
       (5, 2, 3),
       (6, 2, 4);

DELETE FROM heroku_65f5ce87b15f505.answer;
DELETE FROM heroku_65f5ce87b15f505.question;
DELETE FROM heroku_65f5ce87b15f505.quiz;

SET @@auto_increment_increment=1;
SET @@auto_increment_offset=1;
ALTER TABLE `heroku_65f5ce87b15f505`.`quiz` AUTO_INCREMENT = 1 ;
INSERT INTO heroku_65f5ce87b15f505.quiz (idClassroom, idEducator)
VALUES (1, 2),
       (1, 2),
       (2, 1),
       (2, 1),
       (2, 2);
       
SET @@auto_increment_increment=1;
SET @@auto_increment_offset=1;
ALTER TABLE `heroku_65f5ce87b15f505`.`question` AUTO_INCREMENT = 1 ;
INSERT INTO heroku_65f5ce87b15f505.question (idQuiz, question, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE, answerExpected)
VALUES (1, 'Quantos anos tem o Cristo Redentor?', '52','83', '91', '104', 'Todas alternativas anteriores somadas.', 'C'),
       (1, 'Quantos segundos possui um ano bissexto?', '12.527.040', '27.695.080', '31.104.000', '31.536.000', '31.622.400', 'E'),
       (1, 'Quantos presidentes o Brasil já teve?', '2', '16', '38', '44', 'Nenhuma das alternativas anteriores.', 'C'),
       (1, 'Qual a raiz quadrada de 1.522.756?', '1234', '1342', '1423', '1666', '999', 'A'),
       (1, 'Qual valor estimado ao quadro "La Gioconda" de Leonardo da Vinci foi atribuído?', 'R$ 5,5 bilhões', 'US$ 2,5 bi', '€ 50 bi', ' £ 44,7 bi', 'Todas alternativas anteriores.', 'E'),
       (2, 'Qual algorititmo de ordenação possui maior eficiência em um vertor já ordenado?', 'Insertion sort', 'Merge sort', 'Heapsort', 'Quicksort', 'Selection sort', 'A'),
       (2, 'Quantos anos tem o Cristo Redentor?', '52','83', '91', '104', 'Todas alternativas anteriores somadas.', 'C'),
       (2, 'Quantos segundos possui um ano bissexto?', '12.527.040', '27.695.080', '31.104.000', '31.536.000', '31.622.400', 'E'),
       (2, 'Quantos presidentes o Brasil já teve?', '2', '16', '38', '44', 'Nenhuma das alternativas anteriores.', 'C'),
       (2, 'Qual a raiz quadrada de 1.522.756?', '1234', '1342', '1423', '1666', '999', 'A'),
       (3, 'Qual valor estimado ao quadro "La Gioconda" de Leonardo da Vinci foi atribuído?', 'R$ 5,5 bilhões', 'US$ 2,5 bi', '€ 50 bi', ' £ 44,7 bi', 'Todas alternativas anteriores.', 'E'),
       (3, 'Qual algorititmo de ordenação possui maior eficiência em um vertor já ordenado?', 'Insertion sort', 'Merge sort', 'Heapsort', 'Quicksort', 'Selection sort', 'A'),
       (3, 'Quantos anos tem o Cristo Redentor?', '52','83', '91', '104', 'Todas alternativas anteriores somadas.', 'C'),
       (3, 'Quantos segundos possui um ano bissexto?', '12.527.040', '27.695.080', '31.104.000', '31.536.000', '31.622.400', 'E'),
       (3, 'Quantos presidentes o Brasil já teve?', '2', '16', '38', '44', 'Nenhuma das alternativas anteriores.', 'C'),
       (4, 'Qual a raiz quadrada de 1.522.756?', '1234', '1342', '1423', '1666', '999', 'A'),
       (4, 'Qual valor estimado ao quadro "La Gioconda" de Leonardo da Vinci foi atribuído?', 'R$ 5,5 bilhões', 'US$ 2,5 bi', '€ 50 bi', ' £ 44,7 bi', 'Todas alternativas anteriores.', 'E'),
       (4, 'Qual algorititmo de ordenação possui maior eficiência em um vertor já ordenado?', 'Insertion sort', 'Merge sort', 'Heapsort', 'Quicksort', 'Selection sort', 'A'),
       (4, 'Quantos anos tem o Cristo Redentor?', '52','83', '91', '104', 'Todas alternativas anteriores somadas.', 'C'),
       (4, 'Quantos segundos possui um ano bissexto?', '12.527.040', '27.695.080', '31.104.000', '31.536.000', '31.622.400', 'E'),
       (5, 'Quantos presidentes o Brasil já teve?', '2', '16', '38', '44', 'Nenhuma das alternativas anteriores.', 'C'),
       (5, 'Qual a raiz quadrada de 1.522.756?', '1234', '1342', '1423', '1666', '999', 'A'),
       (5, 'Qual valor estimado ao quadro "La Gioconda" de Leonardo da Vinci foi atribuído?', 'R$ 5,5 bilhões', 'US$ 2,5 bi', '€ 50 bi', ' £ 44,7 bi', 'Todas alternativas anteriores.', 'E'),
       (5, 'Qual algorititmo de ordenação possui maior eficiência em um vertor já ordenado?', 'Insertion sort', 'Merge sort', 'Heapsort', 'Quicksort', 'Selection sort', 'A'),
       (5, 'Quantos anos tem o Cristo Redentor?', '52','83', '91', '104', 'Todas alternativas anteriores somadas.', 'C');
       
SET @@auto_increment_increment=1;
SET @@auto_increment_offset=1; 
ALTER TABLE `heroku_65f5ce87b15f505`.`answer` AUTO_INCREMENT = 1;
INSERT INTO heroku_65f5ce87b15f505.answer (idQuiz, idStudent, idQuestion, answerSelected)
VALUES (3, 2, 12, 'B'),
	   (3, 2, 14, 'A'),
       (3, 2, 11, 'B'),
	   (3, 2, 13, 'A'),
       (3, 2, 15, 'B'),
	   (4, 1, 16, 'A'),
	   (4, 1, 17, 'C'),
	   (4, 3, 16, 'A');
       
SELECT B.id, heroku_65f5ce87b15f505.educator.firstName, heroku_65f5ce87b15f505.educator.lastName
FROM ( 
	SELECT heroku_65f5ce87b15f505.Quiz.id, heroku_65f5ce87b15f505.Quiz.idEducator 
		FROM(
			SELECT heroku_65f5ce87b15f505.Registration.idClassroom 
			FROM heroku_65f5ce87b15f505.Registration
			WHERE idStudent = ${userId}) AS A
		INNER JOIN heroku_65f5ce87b15f505.Quiz
		ON A.idClassroom = heroku_65f5ce87b15f505.Quiz.idClassroom
		WHERE (
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Answer
			WHERE heroku_65f5ce87b15f505.Answer.idQuiz = heroku_65f5ce87b15f505.Quiz.id
			AND heroku_65f5ce87b15f505.Answer.idStudent = ${userId})
			=
			(
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Question
			WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id)) AS B
INNER JOIN heroku_65f5ce87b15f505.educator
ON B.idEducator = heroku_65f5ce87b15f505.educator.id;

SELECT B.id, heroku_65f5ce87b15f505.educator.firstName, heroku_65f5ce87b15f505.educator.lastName
FROM ( 
	SELECT heroku_65f5ce87b15f505.Quiz.id, heroku_65f5ce87b15f505.Quiz.idEducator 
		FROM(
			SELECT heroku_65f5ce87b15f505.Registration.idClassroom 
			FROM heroku_65f5ce87b15f505.Registration
			WHERE idStudent = ${userId}) AS A
		INNER JOIN heroku_65f5ce87b15f505.Quiz
		ON A.idClassroom = heroku_65f5ce87b15f505.Quiz.idClassroom
		WHERE (
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Answer
			WHERE heroku_65f5ce87b15f505.Answer.idQuiz = heroku_65f5ce87b15f505.Quiz.id
			AND heroku_65f5ce87b15f505.Answer.idStudent = ${userId})
			<
			(
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Question
			WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id)) AS B
INNER JOIN heroku_65f5ce87b15f505.educator
ON B.idEducator = heroku_65f5ce87b15f505.educator.id;
    
INSERT INTO heroku_65f5ce87b15f505.quiz (idClassroom, idEducator)
VALUES (${classroomId}, ${userId});
INSERT INTO heroku_65f5ce87b15f505.question (idQuiz, question, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE, answerExpected)
VALUES ((SELECT COUNT(*) FROM heroku_65f5ce87b15f505.quiz), ${question1}, ${A1},${B1}, ${C1}, ${D1}, ${E1}, ${answer1});

SELECT COUNT(*) FROM heroku_65f5ce87b15f505.answer WHERE idQuiz = ${quizId} AND idStudent = ${userId} AND idQuestion = ${questionId};
INSERT INTO heroku_65f5ce87b15f505.answer (idQuiz, idStudent, idQuestion, answerSelected)
VALUES (${quizId}, ${userId}, ${questionId}, ${ANSWER});


SELECT DISTINCT heroku_65f5ce87b15f505.educator.id
FROM heroku_65f5ce87b15f505.educator 
WHERE heroku_65f5ce87b15f505.educator.email = ${email} AND heroku_65f5ce87b15f505.educator.password = ${password};
    

SELECT heroku_65f5ce87b15f505.student.id
FROM heroku_65f5ce87b15f505.student 
WHERE heroku_65f5ce87b15f505.student.email = ${email} AND heroku_65f5ce87b15f505.student.password = ${password});

SELECT * FROM heroku_65f5ce87b15f505.educator;       
UPDATE heroku_65f5ce87b15f505.educator
SET heroku_65f5ce87b15f505.educator.email = 'joao.silva@dcc.ufmg.br'
WHERE heroku_65f5ce87b15f505.educator.id = 1;
 
UPDATE heroku_65f5ce87b15f505.educator
SET heroku_65f5ce87b15f505.educator.email = 'maria.jose@dcc.ufmg.br'
WHERE heroku_65f5ce87b15f505.educator.id = 2;
SELECT * FROM heroku_65f5ce87b15f505.educator;

SELECT * 
FROM heroku_65f5ce87b15f505.question
WHERE idQuiz = ${testId};

SELECT id 
FROM heroku_65f5ce87b15f505.quiz
WHERE idEducator = ${userId};

SELECT *
FROM heroku_65f5ce87b15f505.Question
WHERE heroku_65f5ce87b15f505.Question.idQuiz = ${testId};

SELECT B.id, heroku_65f5ce87b15f505.educator.firstName, heroku_65f5ce87b15f505.educator.lastName
FROM ( 
	SELECT heroku_65f5ce87b15f505.Quiz.id, heroku_65f5ce87b15f505.Quiz.idEducator 
		FROM(
			SELECT heroku_65f5ce87b15f505.Registration.idClassroom 
			FROM heroku_65f5ce87b15f505.Registration
			WHERE idStudent = ${userId}) AS A
		INNER JOIN heroku_65f5ce87b15f505.Quiz
		ON A.idClassroom = heroku_65f5ce87b15f505.Quiz.idClassroom
		WHERE (
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Answer
			WHERE heroku_65f5ce87b15f505.Answer.idQuiz = heroku_65f5ce87b15f505.Quiz.id
			AND heroku_65f5ce87b15f505.Answer.idStudent = ${userId})
			=
			(
			SELECT count(*)
			FROM heroku_65f5ce87b15f505.Question
			WHERE heroku_65f5ce87b15f505.Question.idQuiz = heroku_65f5ce87b15f505.Quiz.id)) AS B
INNER JOIN heroku_65f5ce87b15f505.educator
ON B.idEducator = heroku_65f5ce87b15f505.educator.id;

DELETE FROM heroku_65f5ce87b15f505.quiz WHERE id > 16 AND id <20 ;

DELETE FROM heroku_65f5ce87b15f505.answer WHERE idQuiz = 4 ;

SELECT id FROM heroku_65f5ce87b15f505.quiz ORDER BY id DESC LIMIT 1;
