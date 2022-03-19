CREATE DATABASE CLMS;
USE CLMS;
CREATE TABLE Students(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('M','F') NOT NULL,
    adresse VARCHAR(30),
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);
CREATE TABLE Users(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('M','F') NOT NULL,
    adresse VARCHAR(30),
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    salary INT NOT NULL,
    grade ENUM('A','C','D') NOT NULL
);
CREATE TABLE Books (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    publisher VARCHAR(30) NOT NULL,
    author VARCHAR(30) NOT NULL,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    publication_date DATE,
    cover_url VARCHAR(100)
);
CREATE TABLE Borrows(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    book_ID INT,
    student_ID INT ,
    date_borrowed DATE NOT NULL,
    date_return DATE,
    FOREIGN KEY (book_ID) REFERENCES Books(ID),
    FOREIGN KEY (student_ID) REFERENCES Students(ID)
);
CREATE TABLE Transactions(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    borrow_ID INT NOT NULL,
    user_ID INT NOT NULL,
    comment VARCHAR(512),
    FOREIGN KEY (borrow_ID)  REFERENCES Borrows(ID),
    FOREIGN KEY (user_ID)  REFERENCES Users(ID)
);
