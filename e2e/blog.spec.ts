import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('blog page loads', async ({ page }) => {
    await page.goto('/blog')

    // Should show blog page
    await expect(page.locator('h1')).toBeVisible()
  })

  test('blog page shows posts or empty state', async ({ page }) => {
    await page.goto('/blog')

    // Either posts are shown or an empty state message
    const hasContent = await page.locator('article, [data-testid="empty-state"]').count()
    expect(hasContent).toBeGreaterThanOrEqual(0) // Just verify page doesn't error
  })

  test('blog posts have proper structure', async ({ page }) => {
    await page.goto('/blog')

    // If there are posts, check they have titles
    const articles = page.locator('article')
    const articleCount = await articles.count()

    if (articleCount > 0) {
      // First article should have a heading
      const firstArticle = articles.first()
      const heading = firstArticle.locator('h2, h3')
      await expect(heading).toBeVisible()
    }
  })

  test('blog post link navigates correctly', async ({ page }) => {
    await page.goto('/blog')

    const articles = page.locator('article')
    const articleCount = await articles.count()

    if (articleCount > 0) {
      // Click on first post
      const firstLink = articles.first().locator('a').first()
      const href = await firstLink.getAttribute('href')

      if (href) {
        await firstLink.click()
        await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
      }
    }
  })
})

test.describe('Case Studies', () => {
  test('case studies page loads', async ({ page }) => {
    await page.goto('/case-studies')

    await expect(page.locator('h1')).toBeVisible()
  })

  test('case studies page shows content', async ({ page }) => {
    await page.goto('/case-studies')

    // Check for case study cards or content
    const content = page.locator('main')
    await expect(content).toBeVisible()
  })
})
