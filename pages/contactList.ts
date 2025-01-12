import { expect, type Locator, type Page } from '@playwright/test';
import { Contact } from '../lib/Contact';

export class ContactListPage {
    page: Page;
    logout_button: Locator;
    add_contact_button: Locator;
    contact_table: Locator;
    contact_headers: Locator;
    contact_rows: Locator;
    contact_columns: Locator;

    constructor(page:Page) {

        this.page = page;
        this.logout_button = page.getByRole('button', { name: 'logout' })
        this.add_contact_button = page.getByRole('button', { name: 'Add a New Contact' })
        this.contact_table = page.locator('#myTable' )
        this.contact_headers = this.contact_table.locator("thead")
        this.contact_rows = this.contact_table.locator("tr")
        this.contact_columns = this.contact_rows.first().locator("td")

    }

    async gotoContactListPage() { 
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await expect(this.page.getByRole('heading', { name: 'Contact List' })).toBeVisible();
    }

    async clickAddNewContactButton() { 
        await expect(this.add_contact_button).toBeVisible();
        await this.add_contact_button.click()
        await this.page.waitForURL('**/addContact');
    }

    async clickContactRow(details:Contact) { 
        await expect(this.contact_table).toBeVisible();
        await this.contact_rows.filter({hasText: details.firstname}).filter({hasText: await details.dob}).click()
        await this.page.waitForURL('**/contactDetails');
    }
   
    async getContactFromTable(details:Contact) { 
        await expect(this.contact_table).toBeVisible();

        let headers = await this.contact_headers.allTextContents();
        let targetRow = await this.contact_rows.filter({hasText: details.firstname}).filter({hasText: await details.dob}).allTextContents()
        let tableData = new Map<string,string>();

  
        for (let y=0; y<targetRow.length; y++){
            tableData.set(headers[y],targetRow[y])
        }
        return tableData
    }

    async checkTableDataMatchesContactDetails(details:Contact, tableData:Map<string,string>) { 
        expect(tableData.get('Name')).toContain(details.firstname)
        expect(tableData.get('Name')).toContain(details.lastname)
        expect(tableData.get('Birthdate')).toEqual(details.dob)
        expect(tableData.get('Email')).toEqual(details.email)
        expect(tableData.get('Phone')).toEqual(details.phone)
        expect(tableData.get('Address')).toContain(details.street1)
        expect(tableData.get('Address')).toContain(details.street2)
        expect(tableData.get('City, State/Province, Postal Code')).toContain(details.city)
        expect(tableData.get('City, State/Province, Postal Code')).toContain(details.state)
        expect(tableData.get('City, State/Province, Postal Code')).toContain(details.postcode)
        expect(tableData.get('Country')).toContain(details.country)
    }
        
}