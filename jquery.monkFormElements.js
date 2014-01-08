/*
 * jquery.monkFormElements.js - v1.0.0 - 07-JAN-14
 *
 * Adds styleable markup to replace checkboxes and radio buttons.
 *
 */

(function ( $ ) {

  'use strict';

  // The main plugin function.
  $.fn.monkFormElements = function(settings) {

    function appendCheckboxMarkup($element) {
      $element.append(settings.checkbox);
    }

    function removeCheckboxMarkup($element) {
      $element.html('');
    }

    function appendRadioMarkup($element) {
      $element.append(settings.radio);
    }

    function removeRadioMarkup($element) {
      $element.html('');
    }

    $(this).each(function() {
            
      /* Style Checkboxes */
      $(this).find('input[type="checkbox"]').each(function() {

        var $parentForm = $(this).parents('form');
        var $selfInput = $(this);
        var checkboxId = $selfInput.attr('id');
        var checkboxName = $selfInput.attr('name');
        var labelTarget = checkboxId ? checkboxId : checkboxName;

        // Preprate to add the styled checkbox
        var $styledCheckbox = $('<span class="styled-checkbox"></span>');
        
        // If the styled checkbox is clicked, then check off the "real" checkbox.  
        $styledCheckbox.click({$selfInput: $selfInput}, function(event) {

            var $selfInput = event.data.$selfInput;
                     
            if ($selfInput.prop('checked')) {

              // Uncheck the "real" checkbox
              $selfInput.prop('checked', false);

              // Remove the active styling
              $(this).removeClass('active');

              // Remove the addtional markup.
              removeCheckboxMarkup($(this));

            }
            else {

              // Check off the "real" checkbox.
              $selfInput.prop('checked', true);

              // Add the active styling
              $(this).addClass('active');

              // Add the addtional markup.
              appendCheckboxMarkup($(this));

            }

            // If there is a parent label, stop the propegation, so the label "click"
            // event won't fire.
            if ($styledCheckbox.parents('label').length) {
              event.stopPropagation();
            }

        });
        
        // Insert the checkbox
        $selfInput.before($styledCheckbox);

        // If there is a label, let's make sure to associate it.
        if (labelTarget) {

          var $label = $parentForm.find('label[for="'+labelTarget+'"]');
          $label.click({$selfInput : $selfInput, $styledCheckbox : $styledCheckbox}, function(event){

            //var $selfInput = $styledCheckbox.next('input');
            var $selfInput = event.data.$selfInput;
            var $styledCheckbox = event.data.$styledCheckbox;

            if ($selfInput.prop('checked')) {

              // Clicking the label already toggles the "real" checkbox,
              // so no action is needed on the "real" checkbox.
              // Uncheck the "real" checkbox - or so I thought. Due to some 
              // other error, I need to return false on this function. The
              // result is that I DO manually need to uncheck the real checkbox.
              $selfInput.prop('checked', false);

              // Remove the active styling
              $styledCheckbox.removeClass('active');

              // Remove the addtional markup.
              removeCheckboxMarkup($styledCheckbox);

            }
            else {

              // Check off the "real" checkbox.
              $selfInput.prop('checked', true);

              // Add the active class to the styled checkbox
              $styledCheckbox.addClass('active');

              // Add the addtional markup.
              appendCheckboxMarkup($styledCheckbox);
              
            }

            return false;

          });

        } // end if labelTarget

      }); // checkbox each


      /* Style Radios */
      $(this).find('input[type="radio"]').each(function() {

        var $parentForm = $(this).parents('form');
        var $selfInput = $(this);
        var radioId = $selfInput.attr('id');
        var radioName = $selfInput.attr('name');
        var labelTarget = radioId ? radioId : radioName;

        // Preprate to add the styled checkbox
        var $styledRadio = $('<span class="styled-radio"></span>');
        
        // If the styled checkbox is clicked, then check off the "real" checkbox.
        $styledRadio.click({$selfInput: $selfInput, $parentForm : $parentForm, radioName : radioName}, function(event) {

            var $selfInput = event.data.$selfInput;
            var $parentForm = event.data.$parentForm;
            var radioName = event.data.radioName;
            
            if ($selfInput.prop('checked')) {
              
              // Clicking an already active radio button shouldn't do anything.

            }
            else {

              // Remove all the active classes from the radios in the same family.
              var $radioFamily = $parentForm.find('input[name="' + radioName + '"]');
              $radioFamily.prev('.styled-radio').removeClass('active');


              // Remove the addtional markup.
              removeRadioMarkup($radioFamily.prev('.styled-radio'));

              // Add the active class to the styled checkbox
              $styledRadio.addClass('active');

              // Add the addtional markup.
              appendRadioMarkup($styledRadio);

              // unmark all radios
              $radioFamily.prop('checked', false);

              // Check off the "real" radio.
              $selfInput.prop('checked', true);

            }

            // If there is a parent label, stop the propegation, so the label "click"
            // event won't fire.
            if ($styledRadio.parents('label').length) {
              event.stopPropagation();
            }

        });

        // Insert the checkbox
        $selfInput.before($styledRadio);

        // If there is a label let's make sure to associate it
        if (labelTarget) {

          var $label = $parentForm.find('label[for="'+labelTarget+'"]');
          $label.click({$selfInput : $selfInput, $styledRadio : $styledRadio, $parentForm : $parentForm, radioName : radioName}, function(event){

            //var $selfInput = $styledRadio.next('input');
            var $selfInput = event.data.$selfInput;
            var $styledRadio = event.data.$styledRadio;
            var $parentForm = event.data.$parentForm;
            var radioName = event.data.radioName;


            if ($selfInput.prop('checked')) {

              // Clicking an already active radio button shouldn't do anything.

            }
            else {

              // Remove all the active classes from the radios in the same family.
              var $radioFamily = $parentForm.find('input[name="' + radioName + '"]');
              $radioFamily.prev('.styled-radio').removeClass('active');

              // Remove the addtional markup.
              removeRadioMarkup($radioFamily.prev('.styled-radio'));

              // Add the active class to the styled checkbox
              $styledRadio.addClass('active');

              // Add the addtional markup.
              appendRadioMarkup($styledRadio);

            }

            return false;

          });

        } // end if labelTarget

      }); // radio each
      
    }); // form each

    $(this).addClass('styled');

    return this;

  };

}( jQuery ));
