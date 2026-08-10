import { test, expect } from '@playwright/test';

test.describe('RSVP Form Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/rsvp/'); // Adjust to your actual RSVP page URL
  });

  async function findInvite(page, fname, lname) {
    await page.fill('#guest1fname', fname);
    await page.fill('#guest1lname', lname);
    await page.click('text=Find Invitation');
  }

  test('Scenario 1: Single Person - Attending', async ({ page }) => {
    await findInvite(page, 'Justine', 'Rembisz');
    
    // Step 2: Attendance
    await page.locator('#guest_0_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    
    // Step 3: Dinner/Allergies
    await page.locator('#guest_0_dinner').selectOption('Chicken');
    await page.locator('button:has-text("Next")').click();
    
    // Final Step: Notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
  });

  test('Scenario 2: Single Person - Declining', async ({ page }) => {
    await findInvite(page, 'Emily', 'Reyst');
    
    // Step 2: Attendance
    await page.locator('#guest_0_attending_no').click();
    await page.locator('button:has-text("Next")').click();
    
    // Should skip dinner and go straight to notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
  });

  test('Scenario 3: Plus One - Name Entry', async ({ page }) => {
    // Assuming 'PlusOne' is a user with plusone: true in your JSON
    await findInvite(page, 'Chris', 'Bauer'); 
    
    // Guest 1: Attend
    await page.locator('#guest_0_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    await page.locator('#guest_0_dinner').selectOption('Fish');
    await page.locator('button:has-text("Next")').click();
    
    // Guest 2 (Plus One): Attendance
    await expect(page.locator('#plusone-1')).toBeVisible();
    await page.locator('#guest_1_attending_yes').click();
    
    // Verify Name Fields appear
    await expect(page.locator('#guest_1_fname_container')).toBeVisible();
    await page.fill('#guest_1_fname_input', 'Jane');
    await page.fill('#guest_1_lname_input', 'Smith');
    
    await page.locator('button:has-text("Next")').click();
    await page.locator('#guest_1_dinner').selectOption('Vegan');
    await page.locator('button:has-text("Next")').click();
    
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
  });

  test('Scenario 4: Family - Mixed Attendance & Navigation', async ({ page }) => {
    // Assuming 'Family' is a user with 5 guests in your JSON
    await findInvite(page, 'Kim', 'Jasinkiewicz'); 
    
    // Guest 0: Accept
    await page.locator('#guest_0_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    await page.locator('#guest_0_dinner').selectOption('Chicken');
    await page.locator('button:has-text("Next")').click();
    
    // Guest 1: Decline
    await page.locator('#guest_1_attending_no').click();
    await page.locator('button:has-text("Next")').click(); // Should skip Guest 1's dinner
    
    // Guest 2: Accept
    await expect(page.locator('#guest_2_attending_label')).toBeVisible();
    await page.locator('#guest_2_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    await page.locator('#guest_2_dinner').selectOption('Fish');
    await page.locator('button:has-text("Next")').click();

    // Guest 3: Decline
    await page.locator('#guest_3_attending_no').click();
    await page.locator('button:has-text("Next")').click(); // Should skip Guest 3's dinner

    // Guest 4: Accept
    await expect(page.locator('#guest_4_attending_label')).toBeVisible();
    await page.locator('#guest_4_attending_yes').click();
    await page.locator('button:has-text("Next")').click();
    await page.locator('#guest_4_dinner').selectOption('Vegan');
    await page.locator('button:has-text("Next")').click();
    
    // Verify we reached notes
    await expect(page.locator('text=Questions or Concerns?')).toBeVisible();
    
    // --- COMPREHENSIVE BACKWARD NAVIGATION TEST ---
    
    // 1. Back from Notes -> Guest 4 Dinner
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_4_dinner')).toBeVisible();
    
    // 2. Back from Guest 4 Dinner -> Guest 4 Attendance
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_4_attending_label')).toBeVisible();
    
    // 3. Back from Guest 4 Attendance -> Guest 3 Attendance (since Guest 3 declined)
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_3_attending_label')).toBeVisible();
    
    // 4. Back from Guest 3 Attendance -> Guest 2 Dinner (since Guest 3 declined)
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_2_dinner')).toBeVisible();
    
    // 5. Back from Guest 2 Dinner -> Guest 2 Attendance
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_2_attending_label')).toBeVisible();
    
    // 6. Back from Guest 2 Attendance -> Guest 1 Attendance (since Guest 1 declined)
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_1_attending_label')).toBeVisible();
    
    // 7. Back from Guest 1 Attendance -> Guest 0 Dinner (since Guest 1 declined)
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_0_dinner')).toBeVisible();
    
    // 8. Back from Guest 0 Dinner -> Guest 0 Attendance
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest_0_attending_label')).toBeVisible();
    
    // 9. Back from Guest 0 Attendance -> Search Page
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('#guest1fname')).toBeVisible();
  });
});
