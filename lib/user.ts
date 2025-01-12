import { faker } from "@faker-js/faker";
import { expect } from "@playwright/test";



export class UserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  
  constructor() {
    this.firstname = faker.person.firstName();
    this.lastname = faker.person.lastName();
    this.username = faker.person.firstName() + faker.string.numeric(4) + '@test.com';
    this.password = faker.internet.password({ length: 9 });
  }
  

  async postNewUserDetails(details: UserDetails,  request ) {
    const newUser = await request.post(`/users`, {
      data: {
        firstName: details.firstname,
        lastName: details.lastname,
        email: details.username,
        password: details.password,
      },
    });
    await expect(newUser).toBeOK();
  }

  async loginNewUser(details: UserDetails,  request ) {
    const newUser = await request.post(`/users/login`, {
      data: {
        email: details.username,
        password: details.password,
      },
    });
    await expect(newUser).toBeOK();
    let responseJson = await newUser.json()
    process.env.API_TOKEN = responseJson.token
    return newUser;
    
  }
}


