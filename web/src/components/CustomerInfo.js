import React from 'react';

function CustomerInfo({customer}) {
    const addresses = [customer.addressLine1, customer.addressLine2, customer.city, customer.state, customer.country, customer.postalCode];
    const address = addresses.filter(part => !!part).join(', ');
    return (
        <div>
            <h2 className="mb-3">{customer.customerName}</h2>
            <p><strong>Contact Name</strong>: {customer.contactFirstName} {customer.contactLastName}</p>
            <p><strong>Phone</strong>: {customer.phone}</p>
            <p><strong>Address</strong>: {address}</p>
        </div>
    )
}

export default CustomerInfo