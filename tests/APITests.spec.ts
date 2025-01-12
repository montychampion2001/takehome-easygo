import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.ts'
import { UserDetails } from '../lib/User.ts';
import { Contact } from '../lib/Contact.ts';

test('Login to the application', async ({ request }) => {
    //create a new user
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)

    //log in with user. token is stored in process.env
    await userDetails.loginNewUser(userDetails,request)
  
});

test('POST a new Contact', async ({ request }) => {
    //create a new user
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)

    //log in with user. token is stored in process.env
    await userDetails.loginNewUser(userDetails,request)
  
    //make a new contact and POST
    const contactDetails = new Contact()
    await contactDetails.postNewContactDetails(contactDetails, request)
});

test('POST a new Contact with Invalid Details', async ({ request }) => {
    //create a new user
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)

    //log in with user. token is stored in process.env
    await userDetails.loginNewUser(userDetails,request)
  
    //make a new contact and POST
    const contactDetails = new Contact()
    let invalidDetails = contactDetails
    invalidDetails.dob = 'David'
    
    let response = await contactDetails.postInvalidContactDetails(invalidDetails, request)
    await expect(response).not.toBeOK()
});

test('POST a new Contact then get their details', async ({ request }) => {
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)

    //log in with user. token is stored in process.env
    await userDetails.loginNewUser(userDetails,request)
  
    //make a new contact and POST
    const contactDetails = new Contact()
    await contactDetails.postNewContactDetails(contactDetails, request)

    //get contacts
    let getContact = await contactDetails.getContactDetails(request)

    //check the body
    await contactDetails.checkAPIResponseForContact(contactDetails,getContact)

});