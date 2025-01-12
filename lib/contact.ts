import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";
import { APIResponse } from "@playwright/test";


export class Contact {
  firstname: string;
  lastname: string;
  dob: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;

  constructor() {

    
    this.firstname = faker.person.firstName();
    this.lastname = faker.person.lastName();
    this.dob = faker.date.birthdate({ mode: "year", min: 1900, max: 2000 }).toISOString().slice(0, 10);
    this.email = faker.person.firstName().toLowerCase() + "@test.com";
    this.phone = faker.string.numeric(9);
    this.street1 = faker.location.streetAddress(false);
    this.street2 = "Unit " + faker.string.numeric(2);
    this.city = faker.location.city();
    this.state = faker.location.state();
    this.postcode = faker.string.numeric(4);
    this.country = faker.location.country();
  }

  async postNewContactDetails(details:Contact, request ) {
    const newContact = await request.post(`/contacts`, {
      headers:{
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      data: {
        firstName: details.firstname,
        lastName: details.lastname,
        birthdate: details.dob,
        email: details.email,
        phone: details.phone,
        street1: details.street1,
        street2: details.street2,
        city: details.city,
        stateProvince: details.state,
        postalCode: details.postcode,
        country: details.country,
      },
    });
    await expect(newContact).toBeOK();
    return await newContact;
  }

  async postInvalidContactDetails(details:Contact, request ) {
    const newContact = await request.post(`/contacts`, {
      headers:{
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      data: {
        firstName: details.firstname,
        lastName: details.lastname,
        birthdate: details.dob,
        email: details.email,
        phone: details.phone,
        street1: details.street1,
        street2: details.street2,
        city: details.city,
        stateProvince: details.state,
        postalCode: details.postcode,
        country: details.country,
      },
    });
    return await newContact;
  }
  async getContactDetails(request ) {
    const newContact = await request.get(`/contacts`, {
      headers:{
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      }
      
    });
    await expect(newContact).toBeOK();
    return await newContact;
  }

  async checkAPIResponseForContact(contactDetails:Contact, request){
    let responseBodyJSON = await request.json();
    expect(responseBodyJSON[0].firstName).toEqual(contactDetails.firstname);
    expect(responseBodyJSON[0].lastName).toEqual(contactDetails.lastname);
    expect(responseBodyJSON[0].birthdate).toEqual(contactDetails.dob);
    expect(responseBodyJSON[0].email).toEqual(contactDetails.email);
    expect(responseBodyJSON[0].phone).toEqual(contactDetails.phone);
    expect(responseBodyJSON[0].street1).toEqual(contactDetails.street1);
    expect(responseBodyJSON[0].street2).toEqual(contactDetails.street2);
    expect(responseBodyJSON[0].city).toEqual(contactDetails.city);
    expect(responseBodyJSON[0].stateProvince).toEqual(contactDetails.state);
    expect(responseBodyJSON[0].postalCode).toEqual(contactDetails.postcode);
    expect(responseBodyJSON[0].country).toEqual(contactDetails.country);
  }


}

