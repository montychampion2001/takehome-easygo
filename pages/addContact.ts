import { expect, type Locator, type Page } from "@playwright/test";
import { Contact } from "../lib/Contact";

export class AddContactPage {
  page: Page;
  logout_button: Locator;
  firstname_field: Locator;
  lastname_field: Locator;
  dob_field: Locator;
  email_field: Locator;
  phone_field: Locator;
  streetaddress1_field: Locator;
  streetaddress2_field: Locator;
  city_field: Locator;
  state_field: Locator;
  postcode_field: Locator;
  country_field: Locator;
  submit_button: Locator;
  cancel_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logout_button = page.getByRole("button", { name: "logout" });
    this.firstname_field = page.getByPlaceholder("First Name");
    this.lastname_field = page.getByPlaceholder("Last Name");
    this.dob_field = page.getByPlaceholder("yyyy-MM-dd");
    this.email_field = page.getByPlaceholder("Email");
    this.phone_field = page.getByPlaceholder("8005551234");
    this.streetaddress1_field = page.getByPlaceholder("Address 1");
    this.streetaddress2_field = page.getByPlaceholder("Address 2");
    this.city_field = page.getByPlaceholder("City");
    this.state_field = page.getByPlaceholder("State or Province");
    this.postcode_field = page.getByPlaceholder("Postal Code");
    this.country_field = page.getByPlaceholder("Country");
    this.submit_button = page.getByRole("button", { name: "Submit" });
    this.cancel_button = page.getByRole("button", { name: "Cancel" });
  }

  async gotoAddContact() {
    await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/addContact");
    await expect(this.page.getByRole("heading", { name: "Add Contact" })).toBeVisible();
  }

  async clickLogoutButton() {
    await expect(this.logout_button).toBeVisible();
    await this.logout_button.click();
    await this.page.waitForURL("**/");
  }

  async clickCancelButton() {
    await expect(this.cancel_button).toBeVisible();
    await this.cancel_button.click();
    await this.page.waitForURL("**/contactList");
  }

  async createContact(details: Contact) {
    await expect(this.submit_button).toBeVisible();
    await this.firstname_field.fill(details.firstname);
    await this.lastname_field.fill(details.lastname);
    await this.dob_field.fill(await details.dob);
    await this.email_field.fill(details.email);
    await this.phone_field.fill(details.phone);
    await this.streetaddress1_field.fill(details.street1);
    await this.streetaddress2_field.fill(details.street2);
    await this.city_field.fill(details.city);
    await this.state_field.fill(details.state);
    await this.postcode_field.fill(details.postcode);
    await this.country_field.fill(details.country);
    await this.submit_button.click();
  }
}
