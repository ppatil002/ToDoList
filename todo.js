var givenName = document.querySelector('#name')
var btnClass = document.querySelector('#addNameButton')
var listOfName = document.querySelector('#listOfTasks')
btnClass.addEventListener('click', () => {
      var actualName = givenName.value
      if (actualName.length != 0) {
         var createAnHTMLList = `<li class=""><div>${actualName}</div><button
         onclick="removeNameFromTheList(this)">Remove</button>`
         listOfTasks.innerHTML += createAnHTMLList
         givenName.value = ''
         givenName.classList.remove('red')
      } else{
         givenName.classList.add('red')
      }
   })
   function removeNameFromTheList(e) {
      e.parentElement.remove()
   }