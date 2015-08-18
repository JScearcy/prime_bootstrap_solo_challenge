
firstNames = ['David', 'John', 'Andrew', 'James', 'Christopher', 'Paul', 'Steven', 'Kevin', 'Robert', 'Scott',
              'Craig','Michael', 'Mark', 'Stuart', 'Stephen', 'Alan', 'William', 'Gary', 'Ross', 'Colin',
              'Brian', 'Barry', 'Richard', 'Martin', 'Thomas', 'Neil', 'Peter', 'Iain', 'Graeme', 'Ian', 'Gordon',
              'Alexander', 'Ryan', 'Derek', 'Kenneth', 'Allan', 'Jamie', 'Graham', 'Gavin', 'Darren',
              'Stewart', 'Jonathan', 'Daniel', 'Douglas', 'Grant', 'Lee', 'George', 'Joseph', 'Simon', 'Jake'];
lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez',
            'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee',
            'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King',
            'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans'];
titles = ['CEO', 'President', 'VP', 'Chairmain', 'Manager', 'PM', 'BA', 'Front-End Developer', 'Back-End Developer', 'Admin', 'Janitor']
function randomInt(max, min){
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
}
function nameTitleGen(){
  emp = new Employee(firstNames[randomInt(firstNames.length)], lastNames[randomInt(lastNames.length)],
                    randomInt(9999), titles[randomInt(titles.length)], randomInt(5, 1), randomInt(1000000, 20000));
  return emp;
}
