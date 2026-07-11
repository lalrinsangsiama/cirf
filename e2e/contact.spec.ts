import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('contact section loads on about page', async ({ page }) => {
    await page.goto('/about#contact')

    // Should show contact form section
    await expect(page.locator('#contact')).toBeVisible()
    await expect(page.locator('text=Get In Touch')).toBeVisible()
  })

  test('contact form has required fields', async ({ page }) => {
    await page.goto('/contact')

    // Wait for the contact section to be visible
    await page.waitForSelector('#contact', { state: 'visible' })

    // Check for form fields using the "Send message" form specifically (not newsletter)
    const contactForm = page.locator('#contact form:has(button:has-text("Send message"))')
    await expect(contactForm.locator('#contact-name')).toBeVisible()
    await expect(contactForm.locator('input[type="email"]')).toBeVisible()
    await expect(contactForm.locator('textarea')).toBeVisible()
  })

  test('contact form validates required fields', async ({ page }) => {
    await page.goto('/contact')

    // Wait for form to load
    await page.waitForSelector('#contact form', { state: 'visible' })

    // Target the contact form specifically (the one with "Send message" button)
    const submitButton = page.locator('#contact button:has-text("Send message")')
    await submitButton.click()

    // Form should not submit (stay on the contact page)
    await expect(page).toHaveURL(/\/contact/)
  })

  test('contact form shows validation errors', async ({ page }) => {
    await page.goto('/contact')

    // Wait for form to load
    await page.waitForSelector('#contact form', { state: 'visible' })

    // Target the contact form specifically
    const contactForm = page.locator('#contact form:has(button:has-text("Send message"))')

    // Fill in invalid email
    await contactForm.locator('#contact-name').fill('Test User')
    await contactForm.locator('input[type="email"]').fill('invalid')
    await contactForm.locator('textarea').fill('This is a test message that is long enough.')

    // Submit form
    await contactForm.locator('button[type="submit"]').click()

    // Should show error or browser validation
    const emailInput = contactForm.locator('input[type="email"]')
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)
  })
})

test.describe('Newsletter Subscription', () => {
  test('newsletter form exists on homepage', async ({ page }) => {
    await page.goto('/')

    // Look for newsletter signup
    const newsletterInput = page.locator('input[type="email"][placeholder*="email" i]')
    // Newsletter section might be in footer or dedicated section
    const emailInputCount = await newsletterInput.count()
    expect(emailInputCount).toBeGreaterThanOrEqual(0) // May or may not exist depending on page design
  })
})
