import { expect, type Locator, type Page } from '@playwright/test';
import { UserDetails } from '../lib/User';

export class LoginPage {
    page: Page;
    username_field: Locator;
    password_field: Locator;
    submit_button: Locator;
    signup_button: Locator;

    constructor(page:Page) {

        this.page = page;
        this.username_field = page.getByPlaceholder('Email')
        this.password_field = page.getByPlaceholder('Password')
        this.submit_button = page.getByRole('button', { name: 'Submit' })
        this.signup_button = page.getByRole('button', { name: 'Sign up' })
    }

    async gotoLoginPage() { 
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com');
        await expect(this.page.getByRole('heading', { name: 'Contact List App' })).toBeVisible();
    }

    async signUpUser(){
        await expect(this.signup_button).toBeVisible();
        await this.signup_button.click()
        await this.page.waitForURL('**/addUser');
    }
   
    async login(details: UserDetails){
        await expect(this.submit_button).toBeVisible();
        await expect(this.username_field).toBeVisible();
        await this.username_field.fill(details.username);
        await this.password_field.fill(details.password);
        await this.submit_button.click()
        await this.page.waitForURL('**/contactList');
    }

}