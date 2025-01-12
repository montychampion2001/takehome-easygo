import { expect, type Locator, type Page } from '@playwright/test';
import { Contact } from '../lib/Contact';

export class ContactDetailsPage {
    page: Page;
    logout_button: Locator;
    edit_contact_button: Locator;
    delete_contact_button: Locator;
    return_to_list_button: Locator;
    contact_form: Locator;
    firstname_field : Locator;
    lastname_field : Locator;
    dob_field : Locator;
    email_field : Locator;
    phone_field : Locator;
    street1_field : Locator;
    street2_field : Locator;
    city_field : Locator;
    state_field : Locator;
    postcode_field : Locator;
    country_field : Locator;
    


    constructor(page:Page) {

        this.page = page;
        this.logout_button = page.getByRole('button', { name: 'logout' })
        this.edit_contact_button = page.getByRole('button', { name: 'Edit Contact' })
        this.delete_contact_button = page.getByRole('button', { name: 'Delete Contact' })
        this.return_to_list_button = page.getByRole('button', { name: 'Return to Contact List' })
        this.contact_form = page.locator('#contactDetails')
        this.firstname_field = this.contact_form.locator('#firstName')
        this.lastname_field = this.contact_form.locator('#lastName')
        this.dob_field = this.contact_form.locator('#birthdate')
        this.email_field = this.contact_form.locator('#email')
        this.phone_field = this.contact_form.locator('#phone')
        this.street1_field = this.contact_form.locator('#street1')
        this.street2_field = this.contact_form.locator('#street2')
        this.city_field = this.contact_form.locator('#city')
        this.state_field = this.contact_form.locator('#stateProvince')
        this.postcode_field = this.contact_form.locator('#postalCode')
        this.country_field = this.contact_form.locator('#country')

    }

    async gotoContactDetailsPage() { 
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/contactDetails');
        await expect(this.page.getByRole('heading', { name: 'Contact Details' })).toBeVisible();
    }

    async clickEditContactButton(){
        await expect(this.edit_contact_button).toBeVisible();
        await this.edit_contact_button.click()
        await this.page.waitForURL('**/editContact');
    }

    async clickDeleteContactButton(){
        this.page.on('dialog', dialog => dialog.accept());
        await expect(this.delete_contact_button).toBeVisible();
        await this.delete_contact_button.click()
    }

    async clickReturnToContactsButton(){
        await expect(this.return_to_list_button).toBeVisible();
        await this.return_to_list_button.click()
        await this.page.waitForURL('**/contactList');
    }

    async clickLogoutButton(){
        await expect(this.logout_button).toBeVisible();
        await this.logout_button.click()
        await this.page.waitForURL('**/');
    }
   
    async getContactDetailsFromForm() { 
        await expect(this.contact_form).toBeVisible();
        await expect(this.firstname_field).toBeVisible();
        let formDataMap = new Map<string,string>();
        
        formDataMap.set('First Name', await this.firstname_field.innerText())
        formDataMap.set('Last Name', await this.lastname_field.innerText() )
        formDataMap.set('Date of Birth', await this.dob_field.innerText() )
        formDataMap.set('Email', await this.email_field.innerText())
        formDataMap.set('Phone', await this.phone_field.innerText())
        formDataMap.set('Street Address 1', await this.street1_field.innerText())
        formDataMap.set('Street Address 2', await this.street2_field.innerText())
        formDataMap.set('City', await this.city_field.innerText())
        formDataMap.set('State or Province', await this.state_field.innerText())
        formDataMap.set('Postal Code', await this.postcode_field.innerText())
        formDataMap.set('Country', await this.country_field.innerText())
        return formDataMap
    }

    async checkFormDataMatchesContactDetails(details:Contact, formData:Map<string,string>) { 
        expect(formData.get('First Name')).toContain(details.firstname)
        expect(formData.get('Last Name')).toContain(details.lastname)
        expect(formData.get('Date of Birth')).toEqual(details.dob)
        expect(formData.get('Email')).toEqual(details.email)
        expect(formData.get('Phone')).toEqual(details.phone)
        expect(formData.get('Street Address 1')).toContain(details.street1)
        expect(formData.get('Street Address 2')).toContain(details.street2)
        expect(formData.get('City')).toContain(details.city)
        expect(formData.get('State or Province')).toContain(details.state)
        expect(formData.get('Postal Code')).toContain(details.postcode)
        expect(formData.get('Country')).toContain(details.country)
    }

    async checkFormDataContainsValue(formData:Map<string,string>,key:string,value:string) { 
        expect(formData.get(key)).toContain(value)
    }


        
}