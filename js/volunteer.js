
//error prevention if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // get all forms to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('validate');
        // Loop and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        });
    }, false);
    })();



    
        