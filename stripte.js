const stripe = require('stripe')('sk_test_51Jc6cbHXKOWLYjLRftQUnWaxy0AKbiLaNTFZ3hjXjeyxpXpw1zWLuhaZUl9cxzm80EQpnAL5CYrVPzo9dEJWeipn00389UVHQ2');

stripe.customers.create({
    email: 'makara_chhaing@hotmail.com',
  })
    .then(customer => console.log(customer.id))
    .catch(error => console.error(error));