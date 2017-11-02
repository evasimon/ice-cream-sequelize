$(document).ready(function () {
    $('#add-btn').on('click', function () {
        var ice_cream_input = $('#ice-cream').val().trim();
        if (ice_cream_input === "") {
            alert('Please enter your favourite an Ice Cream Flavour!');
            return;
        }
    })
    // once the devour button is clicked
    $('.devour_ice_cream').on('click', function () {
        // gets the id of the ice cream and the cutomer name
        var id = $(this).data('ice_cream_id');
        var customer = $(this).parent().closest('.input-group').children('.form-control').val();
        if (customer === "") {
            alert("Please enter your name!");
            return;
        }
        // sets a PUT ajax call to update the database
        $.ajax('/' + id + '/' + customer, {
            type: 'PUT'
        }).then(
            function () {
                console.log('updated id ', id);
                // reloads the page to get the updated list
                location.reload();
            }
            )
    })
});