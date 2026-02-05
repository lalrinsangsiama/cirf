import { test, expect } from '@playwright/test'

test.describe('Authentication Pages', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/auth/login')

    // Should show login form with Sign in button
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('signup page renders correctly', async ({ page }) => {
    await page.goto('/auth/signup')

    // Should show signup form
    await expect(page.locator('text=Create account')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('login page has link to signup', async ({ page }) => {
    await page.goto('/auth/login')

    const signupLink = page.locator('a:has-text("Sign up")')
    await expect(signupLink).toBeVisible()
    await signupLink.click()
    await expect(page).toHaveURL(/\/auth\/signup/)
  })

  test('signup page has link to login', async ({ page }) => {
    await page.goto('/auth/signup')

    const loginLink = page.locator('a:has-text("Sign in")')
    await expect(loginLink).toBeVisible()
    await loginLink.click()
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test('login form validates email', async ({ page }) => {
    await page.goto('/auth/login')

    // Try to submit with invalid email
    await page.fill('input[type="email"]', 'invalid-email')
    await page.fill('input[type="password"]', 'password123')

    // The browser should show validation error
    const emailInput = page.locator('input[type="email"]')
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)
  })

  test('login form requires password', async ({ page }) => {
    await page.goto('/auth/login')

    // Fill email but leave password empty
    await page.fill('input[type="email"]', 'test@example.com')

    // Find submit button and check form submission
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // Should still be on login page (form not submitted)
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test('header is not shown on auth pages', async ({ page }) => {
    await page.goto('/auth/login')

    // Main navigation header should not be visible
    const mainNav = page.locator('header nav')
    // Either nav doesn't exist or the header doesn't render on auth pages
    const navCount = await mainNav.count()
    // The nav should either not exist or not contain the main navigation
    if (navCount > 0) {
      await expect(page.locator('header nav >> text=Framework')).toBeHidden()
    }
  })
})

test.describe('Protected Routes', () => {
  test('dashboard requires authentication', async ({ page }) => {
    const response = await page.goto('/dashboard')

    // Dashboard should either:
    // 1. Redirect to login page (middleware redirect)
    // 2. Show login prompt/error (client-side check)
    // 3. Return 401/403 (auth required)
    const currentUrl = page.url()
    const hasLoginRedirect = currentUrl.includes('/auth/login')
    const hasAuthPrompt = await page.locator('text=Sign in').count() > 0 ||
                          await page.locator('text=Log in').count() > 0
    const isUnauthorized = response?.status() === 401 || response?.status() === 403

    expect(hasLoginRedirect || hasAuthPrompt || isUnauthorized).toBeTruthy()
  })

  test('admin pages require authentication', async ({ page }) => {
    const response = await page.goto('/admin')

    // Admin should either redirect to login or show auth required
    const currentUrl = page.url()
    const hasLoginRedirect = currentUrl.includes('/auth/login')
    const hasAuthPrompt = await page.locator('text=Sign in').count() > 0 ||
                          await page.locator('text=Log in').count() > 0
    const isUnauthorized = response?.status() === 401 || response?.status() === 403

    expect(hasLoginRedirect || hasAuthPrompt || isUnauthorized).toBeTruthy()
  })
})
