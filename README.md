`Monk Form Elements`

Adds markup to make forms more stylable.

Call it like this:

    $('#text form:not(".styled")').monkFormElements({checkbox: '<span class="icon_check"></span>', radio: '<span class="icon_check"></span>'});


The `checkbox` and `radio` variables in the paramter object are the markup that gets added within the spans that the script automatically adds.

The class `styled` gets added to forms that have already been processed by this script.