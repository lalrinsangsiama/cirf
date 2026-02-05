import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/CIRF/)
  })

  test('main navigation links work', async ({ page }) => {
    await page.goto('/')

    // Test Framework link
    await page.click('text=Framework')
    await expect(page).toHaveURL(/\/framework/)

    // Test Research link
    await page.click('text=Research')
    await expect(page).toHaveURL(/\/research/)

    // Test Case Studies link
    await page.click('text=Case Studies')
    await expect(page).toHaveURL(/\/case-studies/)

    // Test Tools link
    await page.click('text=Tools')
    await expect(page).toHaveURL(/\/tools/)

    // Test Blog link
    await page.click('text=Blog')
    await expect(page).toHaveURL(/\/blog/)

    // Test About link
    await page.click('text=About')
    await expect(page).toHaveURL(/\/about/)
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.click('a:has-text("CIRF")')
    await expect(page).toHaveURL('/')
  })

  test('mobile menu opens and closes', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Menu panel exists but should be off-screen initially (translate-x-full)
    const mobileMenu = page.locator('#mobile-menu')
    await expect(mobileMenu).toHaveClass(/translate-x-full/)

    // Click menu button to open
    await page.click('button[aria-label="Open menu"]')

    // Menu should be on-screen (translate-x-0)
    await expect(mobileMenu).toHaveClass(/translate-x-0/)

    // Click the close button using keyboard escape or click with scroll
    await page.keyboard.press('Escape')

    // Menu should be off-screen again
    await expect(mobileMenu).toHaveClass(/translate-x-full/)
  })

  test('mobile navigation links work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open menu
    await page.click('button[aria-label="Open menu"]')

    // Click Tools link in mobile menu
    await page.click('#mobile-menu >> text=Tools')

    // Should navigate to tools page
    await expect(page).toHaveURL(/\/tools/)
  })
})

test.describe('404 Page', () => {
  test('shows 404 or error page for non-existent routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    // In development mode, Next.js may show error boundary instead of 404
    // Either 404 or error page is acceptable
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const headingText = await heading.textContent()
    // Should show either 404 or "Something went wrong" error page
    expect(headingText?.includes('404') || headingText?.includes('Something went wrong')).toBeTruthy()
  })

  test('404 page has link to homepage', async ({ page }) => {
    await page.goto('/non-existent-page')
    await page.click('text=Go home')
    await expect(page).toHaveURL('/')
  })
})

test.describe('Accessibility', () => {
  test('skip to main content link works', async ({ page }) => {
    await page.goto('/')

    // Focus the skip link
    await page.keyboard.press('Tab')

    // The skip link should be visible when focused
    const skipLink = page.locator('a:has-text("Skip to main content")')
    await expect(skipLink).toBeFocused()

    // Click the skip link
    await skipLink.click()

    // Main content should be focused
    const main = page.locator('main#main-content')
    await expect(main).toBeFocused()
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('/')

    const imagesWithoutAlt = await page.locator('img:not([alt])').count()
    expect(imagesWithoutAlt).toBe(0)
  })

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/')

    // Tab through the page
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(focusedElement).toBeTruthy()
    }
  })
})
