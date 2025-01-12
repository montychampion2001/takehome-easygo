import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.ts'
import {UserDetails} from '../lib/User.ts';
import { Contact } from '../lib/Contact.ts';
import { ContactListPage } from '../pages/contactList.ts';
import { ContactDetailsPage } from '../pages/contactDetails.ts';
import { ContactEditPage } from '../pages/contactEdit.ts';



test('Login to the application', async ({ page,request }) => {
  
  //make new user with API
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)
  
  //log in with new user using UI
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage()
    await loginPage.login(userDetails)
    
    
});


test('Access a Record', async ({ page,request }) => {
  
  //make new user with API
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)
    await userDetails.loginNewUser(userDetails,request)
    


  //make a new entry with API
  const contactDetails = new Contact()
  await contactDetails.postNewContactDetails(contactDetails, request)
  
  //log in with user using UI
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage()
  await loginPage.login(userDetails)

  //access the record using UI
  const contactListPage = new ContactListPage(page);
  await contactListPage.clickContactRow(contactDetails)

  //check the record is the same as the one created
  const contactDetailsPage = new ContactDetailsPage(page);
  let formData = await contactDetailsPage.getContactDetailsFromForm()
  await contactDetailsPage.checkFormDataMatchesContactDetails(contactDetails,formData)
});


test('Modify a record', async ({ page,request }) => {
  
  //make new user with API
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)
    await userDetails.loginNewUser(userDetails,request)
  
  //make a new entry with API
  const contactDetails = new Contact()
  await contactDetails.postNewContactDetails(contactDetails, request)
  
  //log in with user using UI
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage()
  await loginPage.login(userDetails)

  //access the record using UI
  const contactListPage = new ContactListPage(page);
  await contactListPage.clickContactRow(contactDetails)

  //check the record is the same as the one created
  const contactDetailsPage = new ContactDetailsPage(page);
  let formData = await contactDetailsPage.getContactDetailsFromForm()
  await contactDetailsPage.checkFormDataMatchesContactDetails(contactDetails,formData)
  //click edit the record and change data
  await contactDetailsPage.clickEditContactButton()
  let contactDetailsUpdated = contactDetails
  contactDetailsUpdated.firstname = 'David'

  //fill form with new details and submit
  const editDetailsPage = new ContactEditPage(page);
  await editDetailsPage.fillContactDetailsForm(contactDetailsUpdated)
  await editDetailsPage.clickSubmitButton()
  await page.waitForURL('**/contactDetails');

  //check the record has been updated
  //check the record is the same as the one created
  let updatedFormData = await contactDetailsPage.getContactDetailsFromForm()
  await contactDetailsPage.checkFormDataMatchesContactDetails(contactDetailsUpdated,updatedFormData)
  await contactDetailsPage.checkFormDataContainsValue(updatedFormData,'First Name','David')
});


test('Modify a record using invalid birthday', async ({ page,request }) => {
  
  //make new user with API
    const userDetails = new UserDetails()
    await userDetails.postNewUserDetails(userDetails, request)
    await userDetails.loginNewUser(userDetails,request)
  
  //make a new entry with API
  const contactDetails = new Contact()
  await contactDetails.postNewContactDetails(contactDetails, request)
  
  //log in with user using UI
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage()
  await loginPage.login(userDetails)

  //access the record using UI
  const contactListPage = new ContactListPage(page);
  await contactListPage.clickContactRow(contactDetails)

  //check the record is the same as the one created
  const contactDetailsPage = new ContactDetailsPage(page);
  let formData = await contactDetailsPage.getContactDetailsFromForm()
  await contactDetailsPage.checkFormDataMatchesContactDetails(contactDetails,formData)
  //click edit the record and change data
  await contactDetailsPage.clickEditContactButton()
  let contactDetailsUpdated = contactDetails
  contactDetailsUpdated.dob = 'David'

  //fill form with new details and submit
  const editDetailsPage = new ContactEditPage(page);
  await editDetailsPage.fillContactDetailsForm(contactDetailsUpdated)
  await editDetailsPage.clickSubmitButton()
  
  //check error has surfaced
  await expect(editDetailsPage.validation_error_field).toBeVisible();
  expect (editDetailsPage.validation_error_field).toContainText('Validation failed: birthdate: Birthdate is invalid')

});