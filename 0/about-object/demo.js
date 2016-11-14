//function Member(firstname, lastname) {
//    this.firstname = firstname;
//    this.lastname = lastname;
//}
//
//var dreamapple = new Member('dream', 'apple');
//console.log(dreamapple);
//
//Object.defineProperty(dreamapple, 'fullname', {
//    get: function() {
//        return this.firstname + ' ' + this.lastname;
//    },
//    set: function(fullname) {
//        var nameArr = fullname.trim().split(' ');
//        if(2 === nameArr.length) {
//            this.firstname = nameArr[0];
//            this.lastname = nameArr[1];
//        }
//    }
//});
//
//console.log(dreamapple.fullname);
//
//dreamapple.firstname = 'Dream';
//dreamapple.lastname = 'Apple';
//console.log(dreamapple.fullname);
//
//dreamapple.fullname = 'Jhone Hisk';
//console.log(dreamapple.firstname);
//console.log(dreamapple.lastname);
//
//
//var a = {
//    he: 'a',
//    get hehe() {
//        return this.he + new Date();
//    }
//};
//
//console.log(a.hehe);
//a.he = 2;
//console.log(a.hehe);

console.log('------');
//

var dreamapple = {
    firstName: 'dream',
    lastName: 'apple',
    //get fullName() {
    //    return this.firstName + ' ' + this.lastName;
    //},
    //set fullName(fullName) {
    //    var names = fullName.trim().split(' ');
    //    if (2 === names.length) {
    //        this.firstName = names[0];
    //        this.lastName = names[1];
    //    }
    //}
};



Object.defineProperty(dreamapple, 'fullName', {
    enumerable: true,
    get: function () {
        return this.firstName + ' ' + this.lastName;
    },
    set: function (fullName) {
        var names = fullName.trim().split(' ');
        if (2 === names.length) {
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
});

dreamapple.firstName = 'Dream';
dreamapple.lastName = 'Apple';
console.log(dreamapple.fullName); // Dream Apple

dreamapple.fullName = 'Jams King';
console.log(dreamapple.firstName); // Jams
console.log(dreamapple.lastName); // King.