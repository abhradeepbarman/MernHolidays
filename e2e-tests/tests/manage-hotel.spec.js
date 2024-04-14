import {test, expect} from "@playwright/test"
import path from "path"
import { join } from "path"

const UI_URL = "http://localhost:5173"

test.beforeEach(async({page}) => {
  await page.goto(UI_URL)

  //get the sign in button
  await page.getByRole("link", { name: "Sign in"}).click()

  // get the sign-in header
  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible()

  //now fill the form
  await page.locator("[name=email]").fill("123@gmail.com")
  await page.locator("[name=password]").fill("123456")

  //click login button
  await page.getByRole("button", { name: "Login"}).click()

  //expect a sign in successful toast
  await expect(page.getByText("Sign in successful")).toBeVisible()
})

test("should allow user to add a hotel", async({page}) => {
    await page.goto(`${UI_URL}/add-hotel`)

    await page.locator('[name="name"]').fill("Test Hotel")
    await page.locator('[name="city"]').fill("Test City")
    await page.locator('[name="country"]').fill("Test country")
    await page.locator('[name="description"]').fill("This is a Test description")
    await page.locator('[name="pricePerNight"]').fill("100")
    await page.selectOption('select[name="starRating"]', "3")
    await page.getByText("Budget").click()
    await page.getByLabel("Free Wifi").check()
    await page.getByLabel("Spa").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("4")

    await page.setInputFiles('[name="imageFiles"]', [
      path.join(__dirname, "/files", "1.jpg"),
      path.join(__dirname, "/files", "2.jpg"),
      path.join(__dirname, "/files", "3.jpg"),
    ])

    await page.getByRole('button', {name: "Save"}).click()
    await expect(page.getByText("Hotel Added")).toBeVisible()
})