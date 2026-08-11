import { test, expect } from '@playwright/test';

test.describe('Bridal Shower RSVP Form Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/shower/'); // New page URL
  });

  async function findInvite(page, fname, lname) {
    await page.fill('#guest1fname', fname);
    await page.fill('#guest1lname', lname);
    await page.click('text=Find Invitation');
  }

  test('Single Person - Attending', async ({ page }) => {
    await findInvite(page, 'Justine', 'Rembisz');
    
    // Step 2: Attendance
    await expect(page.locator('#guest_0_attending_label')).toBeVisible();
    await page.locator('#guest_0_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    
    // Step 3: Allergies
    await expect(page.locator('#guest_0_allergies')).toBeVisible();
    await page.fill('#guest_0_allergies', 'Peanuts');
    await page.locator('button:has-text("Next")').click();
    
    // Final Step: Notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
  });

  test('Single Person - Declining', async ({ page }) => {
    await findInvite(page, 'Emily', 'Reyst');
    
    // Step 2: Attendance
    await page.locator('#guest_0_attending_no').click();
    await page.locator('button:has-text("Next")').click();
    
    // Should go straight to notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
  });

  test('Scenario 4: Family - Mixed Attendance & Navigation', async ({ page }) => {
    // Assuming 'Family' is a user with 5 guests in your JSON
    await findInvite(page, 'Kim', 'Jasinkiewicz'); 
    
    // Guest 0: Accept
    await page.locator('#guest_0_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    
    // Guest 0: Allergies
    await expect(page.locator('#guest_0_allergies')).toBeVisible();
    await page.fill('#guest_0_allergies', 'Dairy');
    await page.locator('button:has-text("Next")').click();
    
    // Guest 1: Decline
    await expect(page.locator('#guest_1_attending_label')).toBeVisible();
    await page.locator('#guest_1_attending_no').click();
    await page.locator('button:has-text("Next")').click(); // Should skip Guest 1's details
    
    // Verify we reached notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
    
    // --- COMPREHENSIVE BACKWARD NAVIGATION TEST ---
    
    // 1. Back from Notes -> Guest 1 Attendance
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_1_attending_label')).toBeVisible();
    
    // 2. Back from Guest 1 Attendance -> Guest 0 Allergies
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_0_allergies')).toBeVisible();
    
    // 3. Back from Guest 0 Allergies -> Guest 0 Attendance
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_0_attending_label')).toBeVisible();
    
    // 4. Back from Guest 0 Attendance -> Search Page
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest1fname')).toBeVisible();
  });
});
