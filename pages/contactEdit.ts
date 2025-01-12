import { expect, type Locator, type Page } from '@playwright/test';
import { Contact } from '../lib/Contact';

export class ContactEditPage {
    page: Page;
    logout_button: Locator;
    edit_contact_form: Locator;
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
    submit_button: Locator;
    cancel_button: Locator;
    validation_error_field: Locator;
    

    constructor(page:Page) {

        this.page = page;
        this.logout_button = page.getByRole('button', { name: 'logout' })
        this.edit_contact_form = page.locator('#edit-contact')
        this.firstname_field = this.edit_contact_form.locator('#firstName')
        this.lastname_field = this.edit_contact_form.locator('#lastName')
        this.dob_field = this.edit_contact_form.locator('#birthdate')
        this.email_field = this.edit_contact_form.locator('#email')
        this.phone_field = this.edit_contact_form.locator('#phone')
        this.street1_field = this.edit_contact_form.locator('#street1')
        this.street2_field = this.edit_contact_form.locator('#street2')
        this.city_field = this.edit_contact_form.locator('#city')
        this.state_field = this.edit_contact_form.locator('#stateProvince')
        this.postcode_field = this.edit_contact_form.locator('#postalCode')
        this.country_field = this.edit_contact_form.locator('#country')
        this.submit_button = page.getByRole('button', { name: 'Submit' })
        this.cancel_button = page.getByRole('button', { name: 'Cancel' })
        this.validation_error_field = page.locator('#error')

    }


    async clickSubmitButton() { 
        await expect(this.submit_button).toBeVisible();
        await this.submit_button.click()
    }

    async clickCancelButton() { 
        await expect(this.submit_button).toBeVisible();
        await this.submit_button.click()
        await this.page.waitForURL('**/contactDetails');
    }

    async fillContactDetailsForm(details:Contact) { 
        await expect(this.country_field).toHaveValue(/[A-Za-z]/);
        await this.firstname_field.fill(details.firstname);
        await this.lastname_field.fill(details.lastname);
        await this.dob_field.fill(details.dob);
        await this.email_field.fill(details.email);
        await this.phone_field.fill(details.phone);
        await this.street1_field.fill(details.street1);
        await this.street2_field.fill(details.street2);
        await this.city_field.fill(details.city);
        await this.state_field.fill(details.state);
        await this.postcode_field.fill(details.postcode);
        await this.country_field.fill(details.country);
    }

    
    async getContactDetailsFromForm() { 
        await expect(this.edit_contact_form).toBeVisible();
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
        
}