# 💍 Wedding Website

A simple wedding website with Sanity Studio for content management and a Cloudflare Worker for RSVP submissions to Google Sheets.

## ⭐ Features

### 🎙️ Sanity Studio
Content management for the website, allowing for easy updates to the homepage, various pages, and site settings without touching code.

<details>
  <summary>Schemas</summary>

  - Pages
  - Homepage
  - Invitations
  - Contact Info
  - Site Settings
  - Main Menu Navigation
</details>

<details>
  <summary>Components</summary>

  - Rich Text
  - Image
  - Accordions
  - Quote
  - Buttons
  - Table
  - RSVP for wedding or shower
</details>

<details>
  <summary>Plugins</summary>

  - Media plugin for asset management
  - Simpler Color Input for theme colors
  - Vision tool for GROQ queries
</details>

<details>
  <summary>SEO</summary>

  - Meta description
  - Prevent search engine indexing
</details>

<details>
  <summary>Misc</summary>

  - Unique page slug check function
  - Custom desk structure
  - Studio config set by configuration (.env)
  - React Icons
  - Media plugin
</details>

### 🌐 11ty Site
A high-performance static site built with Eleventy.

#### 🌬️ Tailwind CSS
Styled using Tailwind CSS for a modern, responsive design.

Tailwind CSS is configured and setup for use in the front end template files. A simple `tailwind.config.js` file is provided with common colors and scaffolding.

#### 💧 Fluid Tailwind Plugin

The [Fluid plugin](https://fluid.tw) for Tailwind is included by default. It is configured to use the standard Tailwind breakpoints and overrides the screen and font size theme settings to ensure rem is used instead of px. This allows for proper scaling of fonts sizes and spacing utilities. The syntax for using fluid classes is `~property-min/max`:

```css
~text-xl/2xl
~px-4/8
```

#### 🌲 Alpine JS
Interactive elements are powered by Alpine JS.

#### 🕸️ WebC templating
Uses WebC for a component-based approach to HTML templates.

#### 📩 RSVP Form
A dynamic RSVP system that collects guest responses and stores them directly in a Google Spreadsheet.

The RSVP form can handle both wedding invitations as well as bridal shower invitations. The Sanity Invites object will store the family information, whether there is an unknown plus one invited, and each family member's name with a flag if they're also invited to the bridal shower.

When first filling out the RSVP form, the user must enter their name. The AlpineJS code will take all of the invitations and search for the specific user to find their family information. If there are multiple possibilities (people with the same exact name), it will display each and ask the user to confirm their family. If there is a plus one, there will be room for the user to enter that person's information. Otherwise, it will guide the user through every family member invited to the specific function, and ask for attendance, meal choices (if RSVPing to the wedding), and/or allergens. At the end of the form is a space for general notes to the couple.

The form will submit to a single Google spreadsheet with two tabs - one called "Bridal" for the shower, and one simple called "RSVP" for the wedding. Each person, regardless of family, will be entered as a separate row in the spreadsheet. The single notes entry will appear with the first family member's row data.

The user will see a short confirmation message and summary of their submission after pressing the "Submit" button. The site does not send out emails.

## ⚙️ Configuration

The project uses an `.env` file located in the site and studio directories to manage environment variables for both the site and the studio.

### 🎙️ Sanity Studio
- `SANITY_STUDIO_TITLE`: The title displayed in the studio.
- `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID.
- `SANITY_STUDIO_DATASET`: The dataset name (e.g., `production`).
- `SANITY_AUTH_TOKEN`: API token for deployment and authentication.

### 🌐 11ty Site
- `SITE_URL`: The absolute URL of the deployed site (used for SEO and absolute paths).

### 📩 RSVP / Google Sheets
The RSVP form is powered by a Cloudflare Worker that requires the following Google Service Account credentials to write to a spreadsheet:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: The email of the Google service account.
- `GOOGLE_PRIVATE_KEY`: The PEM formatted private key of the service account.
- `GOOGLE_SPREADSHEET_ID`: The ID of the target Google Spreadsheet.
- `GOOGLE_SHEETS_SUBSCRIBERS_PAGE`: The range/sheet name for general RSVPs (e.g., `RSVP!A3:J`).
- `GOOGLE_SHEETS_BRIDAL_SHOWER_PAGE`: The range/sheet name for bridal shower RSVPs.

## 🔧 Development

These commands apply to both the studio and the site, but must be run for each. The applications work together but have independent dev environments and builds.

### 🌐 Site
```bash
cd site
nvm use # Switch to appropriate Node version
npm install # Install dependencies
npm run dev # Run local server
```

## 🚀 Deploy

### 🎙️ Sanity Studio
The studio will deploy to sanity.io when changes are detected in the studio on a code push to the main branch.

The studio can also be manually deployed:
```bash
cd studio
nvm use # Switch to appropriate Node version
npm ci # Install dependencies
npm run deploy # Deploy to sanity.io
```

### 🌐 11ty Site
Deploys the static site to Cloudflare Pages using Wrangler.
```bash
cd site
npm run deploy
```
