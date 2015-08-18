//Employee constructor used to store form imformation
var Employee = function(fName, lName, empNum, title, review, salary){
  this.fName = fName || 'Jake';
  this.lName = lName || 'Scearcy';
  this.empNum = empNum || 1000;
  this.title = title || 'Tester';
  this.review = review || 3;
  this.salary = parseInt(salary) || 100000;
}

//the main jQuery event listener
var main = function() {
  //variables used throughout the jquery functions
  var employees = [];
  var sorterList = [];
  var inst = 0;
  var $myList = $('#EmpTable');
  var $firstName = $('#FirstName');
  var $lastName = $('#LastName');
  var $emNum = $('#EmpNum');
  var $titled = $('#Title');
  var $rev = $('#Review');
  var $sal = $('#Salary');
  var $salies = $('span#TotalSalary');
  var $totSalies = $('span#TotalSalaryEntered');
  var $empInput = $('span#EmpEntered');
  var $empDisplayed = $('span#EmpDisplayed')
  //allows list elements to be moved with the mouse for custom sorting
  $myList.sortable({
    appendto: document.body,
  })
  //submit button when the form is filled out
  $('#Submit').click(function(e){
    //take form data and store it as an object
    var $emp = new Employee(
                            $firstName.val(),
                            $lastName.val(),
                            $emNum.val(),
                            $titled.val(),
                            $rev.val(),
                            $sal.val()
                           );
    $emp.instance = inst; //a unique instance number to avoid duplicate issues
    inst += 1;
    employees.push($emp);
    $empInput.text(employeeInputUpdate(employees, sorterList));
    resetForm();
    e.preventDefault();
  })
  //clear the screen of all employees
  $('#ClearAll').click(function(e){
      $myList.empty();
      sorterList = [];
      employees = [];
      inst = 0;
      $salies.text(salaryUpdate(sorterList));
      $totSalies.text(totalSalaryUpdate(employees, sorterList));
      $empDisplayed.text(employeesDisplayed(sorterList));
      $empInput.text(employeeInputUpdate(employees, sorterList));
    e.preventDefault();
  })
  //show the data stored in the variable using function defined below
  $('#Populate').click(function(e){
    employees.forEach(function(emp){
      displayEmployees(emp)
    })
    employees.forEach(function(obj){
      sorterList.push(obj);
    })
    $salies.text(salaryUpdate(sorterList));
    employees = [];
    $totSalies.text(totalSalaryUpdate(employees, sorterList));
    $empDisplayed.text(employeesDisplayed(sorterList));
    $empInput.text(employeeInputUpdate(employees, sorterList));
    deleteButton();
    hideButton();
    e.preventDefault();

  })
  //hide but keep employees in memory
  $('#unPopulate').click(function(e){
    $myList.empty();
    sorterList.forEach(function(obj){
      employees.push(obj);
    })
    sorterList = [];
    $salies.text(salaryUpdate(sorterList));
    $totSalies.text(totalSalaryUpdate(employees, sorterList));
    $empDisplayed.text(employeesDisplayed(sorterList));
    $empInput.text(employeeInputUpdate(employees, sorterList));
    deleteButton();
    hideButton();
    e.preventDefault();
  })
  //sort button action - runs the sorting function and feeds the array into it
  $('#SortA').click(function(e){
    sortListA(sorterList);
    deleteButton();
    hideButton();
    e.preventDefault();
  })
  //same as above, but sorts the opposite way
  $('#SortD').click(function(e){
    sortListD(sorterList);
    deleteButton();
    hideButton();
    e.preventDefault();
  })
  $('#SortTitle').click(function(e){
    sortListByTitle(sorterList)
    deleteButton();
    hideButton();
    e.preventDefault
  })
  //create an randomized Employee object out of the list provided - in separate js file nameGen.js
  $('#RandEmp').click(function(e){
    var thisEmp = nameTitleGen();
    thisEmp.instance = inst;
    inst += 1;
    employees.push(thisEmp);
    $empInput.text(employeeInputUpdate(employees, sorterList));
    $totSalies.text(totalSalaryUpdate(employees, sorterList));
    e.preventDefault();
  });
  $('#Reset').click(function(e){
    resetForm();
    e.preventDefault();
  })
  $('button').click(function(e){
    $(this).blur();
    e.preventDefault();
  })
  //take an employee object and display on screen
  function displayEmployees(emp){
    var $myListDiv = $('<div>')
    var $myListItem = $('<ul>');
    var $clearButton = $('<button>');
    var $hideButton = $('<button>');
    $myListDiv.attr({id: emp.lName + emp.instance, class: 'listItem'});
    $clearButton.attr({class: 'deleteOne',
                      id: emp.lName + emp.instance});
    $clearButton.html('Delete');
    $hideButton.attr({class: 'hideOne',
                      id: emp.lName + emp.instance});
    $hideButton.html('Hide');
    $myListItem.attr({class: 'empListItem'});
    var listtext = $('<li id="' + emp.fName + '">' + emp.lName + ", " + emp.fName +
                     '<li>Emp. Num: ' + emp.empNum +
                     '<li>Title: ' + emp.title +
                     reviewColor(emp) + 'Review Score: ' + emp.review +
                     '<li>Salary: $' + emp.salary.toLocaleString() + '</li>');
    $myListItem.append(listtext);
    $myListItem.append($clearButton);
    $myList.append($myListDiv.append($myListItem.append($hideButton)));
  }
  //function to sort the list by last name - ascending
  function sortListA(array, sortStyle){
    array.sort(function(a,b){
        var first = a.lName.toUpperCase() + a.fName.toUpperCase();
        var second = b.lName.toUpperCase() + b.fName.toUpperCase();
        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
     });
     $myList.empty();
     array.forEach(function(obj){
       displayEmployees(obj);
     })
   }
   //function to sort list by last name - descending
   function sortListD(array){
     array.sort(function(a,b){
        var first = a.lName.toUpperCase() + a.fName.toUpperCase();
        var second = b.lName.toUpperCase() + b.fName.toUpperCase();
        if (first < second) return 1;
        if (first > second) return -1;
        return 0;
      });
      $myList.empty();
      array.forEach(function(obj){
        displayEmployees(obj);
      })
    }
    function sortListByTitle(array){
      array.sort(function(a,b){
        var first = a.title.toUpperCase();
        var second = b.title.toUpperCase();
        if (first < second) return -1;
        if (first > second) return 1
        return 0;
      })
      $myList.empty();
      array.forEach(function(obj){
        displayEmployees(obj);
      })
    }
   //function to change class on the review list item depending on score
   function reviewColor(obj){
     switch(parseInt(obj.review)){
      case 1:
        return '<li class="bad"> ';
      case 2:
        return '<li class="bad"> ';
      case 3:
        return '<li class="satisfactory">';
      case 4:
        return '<li class="good">';
      case 5:
        return '<li class="good">';
      default:
        return '<li>';
     }
   }
   //update the total of salaries being displayed
   function salaryUpdate(objArray){
     var salaries = 0;
     if(objArray.length > 0){
       objArray.forEach(function(obj){
         salaries += obj.salary
       })
     }
     return ('$' + salaries.toLocaleString());
   }
   function totalSalaryUpdate(empArray, sortArray) {
     var salaries = 0
     if(empArray.length>0){
        empArray.forEach(function(obj){
          salaries += obj.salary;
       })
     }
     if(sortArray.length > 0){
       sortArray.forEach(function(obj){
         salaries += obj.salary;
       })
     }
     return ('$' + salaries.toLocaleString());
   }
   //update how many employees have been input
   function employeeInputUpdate(empArray, sortArray) {
     return (empArray.length + sortArray.length);
   }
   //update how many employees are being displayed
   function employeesDisplayed(sortArray) {
     return ((sortArray) ? sortArray.length : 0);
   }
   //the function for the event listener to delete an employee
   function deleteButton() {
     $('button.deleteOne').click(function(){
       var thisId = $(this).attr('id');
       $(this).parent().parent().remove();
       sorterList.forEach(function(obj, i){
         if(obj.lName + obj.instance == thisId){
           sorterList.splice(i, 1);
         }
       })
       $salies.text(salaryUpdate(sorterList));
       $totSalies.text(totalSalaryUpdate(employees, sorterList));
       $empDisplayed.text(employeesDisplayed(sorterList));
       $empInput.text(employeeInputUpdate(employees, sorterList));
     })
   }
   //hide button function to hide but keep employee in memory
   function hideButton() {
     $('button.hideOne').click(function(){
       var thisId = $(this).attr('id');
       $(this).parent().parent().remove();
       sorterList.forEach(function(obj, i){
         if(obj.lName + obj.instance == thisId){
           employees.push(obj);
           sorterList.splice(i, 1);
         }
       })
       $salies.text(salaryUpdate(sorterList));
       $totSalies.text(totalSalaryUpdate(employees, sorterList));
       $empDisplayed.text(employeesDisplayed(sorterList));
       $empInput.text(employeeInputUpdate(employees, sorterList));
     })
   }
   // reset input form
   function resetForm(){
     $('input.field').val('');
     $('select').prop('selectedIndex', 0);
   }
}

$(main)
