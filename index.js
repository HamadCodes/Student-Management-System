#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    studentId;
    courses;
    balance;
    constructor(name, studentId) {
        this.name = name;
        this.studentId = studentId;
        this.courses = [];
        this.balance = 5000;
    }
    enrollCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance: ${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`\nPaid ${amount} Remaining balaance: ${this.balance}\n`);
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.studentId}`);
        console.log(`Courses: ${this.courses}`);
        this.viewBalance();
    }
}
let students = [];
async function addStudent() {
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter student name"
    });
    const studentID = Math.floor(10000 + Math.random() * 90000);
    const student = new Student(name.trim(), studentID);
    students.push(student);
    console.log(`\nStudent added succesfully! ID: ${studentID}\n`);
}
async function enrollCourse() {
    if (students.length > 0) {
        const studentNames = students.map(student => student.name);
        const { studentName, course } = await inquirer.prompt([
            {
                type: 'list',
                name: 'studentName',
                message: 'Select student:',
                choices: studentNames,
            },
            {
                type: 'input',
                name: 'course',
                message: 'Enter course name:',
            },
        ]);
        const student = students.find(student => student.name === studentName);
        if (student) {
            student.enrollCourse(course);
            console.log(`\n${studentName} enrolled in ${course} successfully.\n`);
        }
        else {
            console.log('Student not found.');
        }
    }
    else {
        console.log("\nThere are no students yet please add some students\n");
    }
}
async function viewBalance() {
    if (students.length > 0) {
        const studentNames = students.map(student => student.name);
        const { studentName } = await inquirer.prompt({
            type: 'list',
            name: 'studentName',
            message: 'Select student:',
            choices: studentNames,
        });
        const student = students.find(student => student.name === studentName);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log('Student not found.');
        }
    }
    else {
        console.log("\nThere are no students yet please add some students\n");
    }
}
async function payTuition() {
    if (students.length > 0) {
        const studentNames = students.map(student => student.name);
        let isRunning = true;
        while (isRunning) {
            const { studentName, amount } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'studentName',
                    message: 'Select student:',
                    choices: studentNames,
                },
                {
                    type: 'number',
                    name: 'amount',
                    message: 'Enter tuition amount to pay:',
                },
            ]);
            if (!isNaN(amount)) {
                const student = students.find(student => student.name === studentName);
                if (student) {
                    student.payTuition(amount);
                    isRunning = false;
                }
                else {
                    console.log('Student not found.');
                }
            }
            else {
                console.log("\nTry Again and Please Enter a Valid Number\n");
            }
        }
    }
    else {
        console.log("\nThere are no students yet please add some students\n");
    }
}
async function showStatus() {
    if (students.length > 0) {
        const studentNames = students.map(student => student.name);
        const { studentName } = await inquirer.prompt({
            type: 'list',
            name: 'studentName',
            message: 'Select student:',
            choices: studentNames,
        });
        const student = students.find(student => student.name === studentName);
        if (student) {
            student.showStatus();
        }
        else {
            console.log('Student not found.');
        }
    }
    else {
        console.log("\nThere are no students yet please add some students\n");
    }
}
while (true) {
    const { choice } = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'Choose an option:',
        choices: ['Add Student', 'Enroll in Course', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit'],
    });
    switch (choice) {
        case 'Add Student':
            await addStudent();
            break;
        case 'Enroll in Course':
            await enrollCourse();
            break;
        case 'View Balance':
            await viewBalance();
            break;
        case 'Pay Tuition':
            await payTuition();
            break;
        case 'Show Status':
            await showStatus();
            break;
        case 'Exit':
            console.log('Exiting program.');
            process.exit(0);
        default:
            console.log('Invalid choice. Please try again.');
            break;
    }
}
