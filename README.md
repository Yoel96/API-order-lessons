# School Proyect 2 OrderLessons

## Proyect description

Welcome to our app OrderLessons, an backend where we offer tutoring services for all types of students, where you can book with different teachers depending on the course and subjects you need. There is the possibility of receiving the classes online or in person.

Aquí podemos poner un enlace de la página

## TEAM
- [Juan Yoel Betancor Martín](https://github.com/Yoel96 )
- [Alexandra Mejías Hernandez](https://github.com/AlexandraMH93)
- [Musa Djiguel Camara](https://github.com/Musadjc)

## TECH
- ![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) **Express**
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) **Sequelize**
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript (JS)**

## AUTHTORIZATION
- **Administrator Role**: The administrator role will have full access to the backend for configuration and maintenance. This means that he/she can modify functionality, query the database and problems with registration and login.
  
- **Teacher**: The teacher role can enter the subjects and the level of the course he/she teaches and configure the available schedules, as well as cancel appointments and indicate whether they are face-to-face or online and their cost.
  
- **Student**: The student's role, once logged in, can choose the course level, the subjects and the teacher. In addition to booking appointments that are available from all teachers, with the option to cancel and choose whether it is face-to-face or online.

 ## Requeriments
 - Node.js
 - Database(Change .env-> Dialect with the one you use)


 ## Installation
To get started with the School Administration API, just get into the repo and run:
``` npm i ```

# Usage

Create .env file to your own settings. To start the api server just run:

``` node index.js```

## Data structure and models

![image](https://github.com/Yoel96/API-order-lessons/assets/128009010/1065ba90-5bfd-44c9-9498-20b34017ab0f)

### Relations

### One to one
- Ref: "teacher_info"."user_id" - "users"."id"
- Ref: "classesDate"."timeTable_id" - "timetable"."id"
### One to many
- Ref: "teacher_info"."id" < "timetable"."teacher_id"
- Ref: "classesDate"."student_id" < "users"."id"
### Many to many
- Ref: "teacher_Student_Favourite"."teacher_id" > "teacher_info"."id"
- Ref: "teacher_Student_Favourite"."student_id" > "users"."id"
- Ref: "teacher_subject"."subject_id" > "subjects"."id"
- Ref: "teacher_subject"."teacher_id" > "teacher_info"."id"
- Ref: "Teacher_ratings"."user_id" > "users"."id"
- Ref: "Teacher_ratings"."teacher_id" > "teacher_info"."id"
- Ref: "subject_lessonType"."subject_id" > "subjects"."id"
- Ref: "subject_lessonType"."subject_id" > "Lesson_Type"."id"

 # Backend Endpoints PENDIENTE DE MODIFICACION
 <details>
<summary>:point_right: Auth Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN | ROLE         | DESCRIPTION                        | POST PARAMS                | RETURNS                              |
| ------ | ------------------------- | ----- | ------------ | ---------------------------------- | -------------------------- | -------------------------------|
| POST   | /signup                   | NO    | Client       | Creates an account                 | -                          | { token, rol }                 |
| POST   | /login                    | NO    | Client       | Logs in with corresponding account | -                          | { token, rol }                 |

</details>

<details>
<summary>:point_right: Booking Endpoints </summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Client       | Gets all bookings                         | -                          | [{ booking }]                  |
| GET    | /:id                      | YES    | Client       | Gets one booking                          | booking_id                 | { booking }                    |
| GET    | /clase/classroom/:id      | YES    | Client       | Gets all classes and teachers for booking | booking_id                 | { booking }                    |
| POST   | /                         | YES    | Admin        | Creates a booking                         | -                          | Booking created sucessfully    |
| PUT    | /:id                      | YES    | Admin        | Updates a specific booking                | booking_id                 | Booking updated successfully   |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific booking                | booking_id                 | Booking deleted sucessfully    |

</details>

<details>
<summary>:point_right: Class Endpoints</summary>
   
> ***Note:***  Class is a VSCode reserved word, so instead we used the word in Spanish "clase" 

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Client       | Gets all classes                          | -                          | [{ classes }]                  |
| GET    | /:id                      | YES    | Admin        | Gets one class                            | class_id                   | { class   }                    |
| GET    | /count/:id                | YES    | Admin        | Gets a count of classes by Teacher        | class_id                   | { class, teacherCount }        |
| POST   | /                         | YES    | Admin        | Creates a class                           | -                          | Class created sucessfully      |
| PUT    | /:id                      | YES    | Admin        | Updates a specific class                  | booking_id                 | Class updated successfully     |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific class                  | booking_id                 | Class deleted sucessfully      |

</details>

<details>
<summary>:point_right: Classroom Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                        |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | -------------------------------|
| GET    | /                         | YES    | Admin        | Gets all classrooms                       | -                          | [{ booking }]                  |
| GET    | /:id                      | YES    | Admin        | Gets one classroom                        | classroom_id               | { classroom }                  |
| GET    | /:id/clase                | YES    | Admin        | Gets the classroom related to a class     | classroom_id               | { classroom }                  |
| POST   | /                         | YES    | Admin        | Creates a classroom                       | -                          | Classroom created sucessfully  |
| PUT    | /:id                      | YES    | Admin        | Updates a specific classroom              | classroom_id               | Classroom updated successfully |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific classroom              | classroom_id               | Classroom deleted sucessfully  |

</details>

<details>
<summary>:point_right: Subscription Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /                         | YES    | Client       | Gets all subscriptions                    | -                          | [{ subscriptions }]               |
| GET    | /:id                      | YES    | Client       | Gets one subscription                     | subscription_id            | { subscription }                  |
| POST   | /                         | YES    | Admin        | Creates a subscription                    | -                          | Subscription created sucessfully  |
| PUT    | /:id                      | YES    | Admin        | Updates a specific subscription           | subscription_id            | Subscription updated successfully |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific subscription           | subscription_id            | Subscription deleted sucessfully  |

</details>

<details>
<summary>:point_right: Teacher Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /                         | YES    | Client       | Gets all teachers                         | -                          | [{ teachers }]                    |
| GET    | /:id                      | YES    | Client       | Gets one teacher                          | teacher_id                 | { teacher }                       |
| POST   | /                         | YES    | Admin        | Creates a teacher                         | -                          | Teacher created sucessfully       |
| PUT    | /:id                      | YES    | Admin        | Updates a specific teacher                | teacher_id                 | Teacher updated successfully      |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific teacher                | teacher_id                 | Teacher deleted sucessfully       |

</details>

<details>
<summary>:point_right: User Endpoints</summary>

| METHOD | ENDPOINT                  | TOKEN  | ROLE         | DESCRIPTION                               | POST PARAMS                | RETURNS                           |
| ------ | ------------------------- | ------ | ------------ | ----------------------------------------- | -------------------------- | --------------------------------- |
| GET    | /profile                  | YES    | Client       | Gets the profile of the login user        | -                          | { user }                          |
| GET    | /suscription              | YES    | Client       | Gets the actual suscription of user       | -                          | { suscription }                   |
| GET    | /                         | YES    | Client       | Gets all users                            | -                          | [{ users }]                       |
| GET    | /userbooking/:id          | YES    | Client       | Gets all user's bookings                  | user_id                    | { user.bookings }                 |
| GET    | /:id                      | YES    | Client       | Gets a specific user                      | user_id                    | { user }                          |
| GET    | /booking/:id              | YES    | Client       | Gets the classes the user is booked       | user_id                    | [{ classes }]                     |
| POST   | /                         | YES    | Client       | Creates a user                            | -                          | User created successfully         |
| POST   | /userbooking              | YES    | Client       | Books a user to a booking                 | -                          | Booked successfully               |
| DELETE | /userbooking/delete       | YES    | Client       | Deletes the booking of a user             | -                          | User booking deleted              |
| PUT    | /:id                      | YES    | Client       | Updates a specific user                   | user_id                    | User updated successfully         |
| DELETE | /:id                      | YES    | Admin        | Deletes a specific user                   | user_id                    | User deleted sucessfully          |

</details>
