'use strict';

class Human {
  constructor(name, surname, birthday) {
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
  }
  getAgeStudent() {
    return new Date().getFullYear() - this.birthday;
  }
}

class Student extends Human {
  _attendance = null;
  _rating = null;

  constructor(...human) {
    super(...human);
    this.attendance = new Array(10);
    this.rating = new Array(10);
  }

  gradePointAverage() {
    let count = 0;
    const sum = this.rating.reduce(function (acc, el) {
      if (el !== undefined) {
        acc += el;
        count++;
      }
      return acc;
    }, 0);
    const result = sum / count;
    return +result.toFixed(1);
  }



  #valueIndexAttendance() {
    return this.attendance.findIndex((element) => element === undefined);
  }

  present() {
    if (this.#valueIndexAttendance() <= 10 && this.#valueIndexAttendance() >= 0) {
      return (this.attendance[this.#valueIndexAttendance()] = true);
    } else {
      console.log('У вас только 10 занятий');
    }
  }

  absent() {
    if (this.#valueIndexAttendance() <= 10 && this.#valueIndexAttendance() >= 0) {
      return (this.attendance[this.#valueIndexAttendance()] = false);
    } else {
      console.log('У вас только 10 занятий');
    }
  }

  mark(value) {
    const valueIndexAppraisal = this.rating.findIndex(
        (element) => element === undefined
    );
    if (value > 11 || value <= 0) {
      console.log('Введите оценку от 1 до 10');
    } else if (valueIndexAppraisal >= 0 && valueIndexAppraisal <= 10) {
      return (this.rating[valueIndexAppraisal] = value);
    } else {
      console.log('У вас только 10 занятий');
    }
  }

  get rating () {
    return this._rating;
  }

  set rating (val) {
    this._rating = val;
  }

  summary() {
    const lessonsEnded = [0, 0];

    for (let i = 0; i < this.attendance.length; i++) {
      if (this.attendance[i] !== undefined) {
        lessonsEnded[0]++;
      }
      if (this.attendance[i]) {
        lessonsEnded[1]++;
      }
    }

    const averageVisit = +(lessonsEnded[1] / lessonsEnded[0]).toFixed(1);

    if (this.gradePointAverage() >= 9 && averageVisit >= 0.9) {
      return 'Ути какой молодчинка!';
    } else if (
        (this.gradePointAverage() < 9 && averageVisit >= 0.9) ||
        (this.gradePointAverage() >= 9 && averageVisit < 0.9)
    ) {
      return 'Норм, но можно лучше';
    }
    return 'Редиска!';
  }

  get attendance () {
    return this._attendance;
  }

  set attendance (val) {
    this._attendance = val;
  }

}

const newStudent = new Student('Johny', 'Depp', 1970);

newStudent.absent();
newStudent.absent();
newStudent.absent();
newStudent.present();
newStudent.present();
newStudent.present();
newStudent.mark(10);
newStudent.mark(4);
newStudent.mark(3);

console.log(newStudent.getAgeStudent());
console.log(newStudent.summary());
console.log(newStudent.gradePointAverage());
console.log(newStudent);

const newStudent2 = new Student('Nicole', 'Kidman', 1990);

newStudent2.absent();
newStudent2.absent();
newStudent2.absent();
newStudent2.present();
newStudent2.present();
newStudent2.present();
newStudent2.mark(10);
newStudent2.mark(9);
newStudent2.mark(8);

console.log(newStudent2.getAgeStudent());
console.log(newStudent.gradePointAverage());
console.log(newStudent2.summary());
console.log(newStudent2);

// Студен должен наследоваться от класса Human

// В класс Human нужно перенести все общие методы и свойства которые могут встречаться у других типов людей.

// Не забывайте про сокрытие реализации, пользуйтесь приватными, защищенными и статическими свойствами.
// Если нету, например статических свойств, придумайте какой-то свой метод, который должен будет работать как статический.
