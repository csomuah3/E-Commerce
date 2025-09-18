$(document).ready(function() {
    $('#register-form').submit(function(e) {
        e.preventDefault();

        // Get form values
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var password = $('#password').val();
        var phone_number = $('#phone_number').val().trim();
        var country = $('#country').val();
        var city = $('#city').val().trim();
        var role = $('input[name="role"]:checked').val();

        console.log('=== REGISTRATION ATTEMPT ===');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone_number);
        console.log('Country:', country);
        console.log('City:', city);
        console.log('Role:', role);

        // Basic validation
        if (name === '' || email === '' || password === '' || phone_number === '' || country === '' || city === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Show loading
        var $btn = $('button[type="submit"]');
        $btn.prop('disabled', true).text('Registering...');

        // AJAX request
        $.ajax({
            url: '../actions/register_user_action.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                password: password,
                phone_number: phone_number,
                country: country,
                city: city,
                role: role
            },
            success: function(response) {
                console.log('=== SERVER RESPONSE (SUCCESS) ===');
                console.log('Full Response:', response);
                console.log('Status:', response.status);
                console.log('Message:', response.message);
                
                if (response.status === 'success') {
                    alert('SUCCESS: ' + response.message);
                    window.location.href = 'login.php';
                } else {
                    alert('ERROR: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.log('=== AJAX ERROR ===');
                console.log('Status:', status);
                console.log('Error:', error);
                console.log('Response Text:', xhr.responseText);
                console.log('Status Code:', xhr.status);
                
                alert('AJAX Error: ' + xhr.responseText);
            },
            complete: function() {
                $btn.prop('disabled', false).text('Register');
            }
        });
    });
});