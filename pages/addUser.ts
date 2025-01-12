import { expect, type Locator, type Page } from '@playwright/test';
import { UserDetails } from '../lib/User';

export class AddUserPage {
    page: Page;
    firstname_field: Locator;
    lastname_field: Locator;
    username_field: Locator;
    password_field: Locator;
    submit_button: Locator;
    cancel_button: Locator;

    constructor(page:Page) {

        this.page = page;
        this.firstname_field = page.getByPlaceholder('First Name')
        this.lastname_field = page.getByPlaceholder('Last Name')
        this.username_field = page.getByPlaceholder('Email')
        this.password_field = page.getByPlaceholder('Password')
        this.submit_button = page.getByRole('button', { name: 'Submit' })
        this.cancel_button = page.getByRole('button', { name: 'Cancel' })
    }

    async gotoAddUserPage() { 
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser');
        await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
    }
   
    async createUser(details:UserDetails){
        await expect(this.submit_button).toBeVisible();
        await this.firstname_field.fill(details.firstname);
        await this.lastname_field.fill(details.lastname);
        await this.username_field.fill(details.username);
        await this.password_field.fill(details.password);
        await this.submit_button.click()
        await this.page.waitForURL('**/contactList');
    }

}