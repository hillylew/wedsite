# 🧑‍🎤 Creative Sanity Starter

Starting point for a standard web project requiring Sanity Studio.

## ⭐ Features

### 🎙️ Sanity Studio

<details>
  <summary>Schemas</summary>

  - Pages
  - Homepage
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

### 🌐 11ty site

#### 🌬️ Tailwind CSS
Tailwind CSS is configured and setup for use in the front end template files. A simple `tailwind.config.js` file is provided with common colors and scaffolding.

#### 💧 Fluid Tailwind Plugin

The [Fluid plugin](https://fluid.tw) for Tailwind is included by default. It is configured to use the standard Tailwind breakpoints and overrides the screen and font size theme settings to ensure rem is used instead of px. This allows for proper scaling of fonts sizes and spacing utilities. The syntax for using fluid classes is `~property-min/max`:

```css
~text-xl/2xl
~px-4/8
```

#### 🌲 Alpine JS
Alpine JS is included and loaded on each page of the site. The official focus plugin is included and used in the mobile menu.

#### 🎉 Jampack 

Jampack runs on `npm run build` and provides some performance optimizations. The config file is located site/jampack.config.js. Further optimizations can be had by adding `<the-fold></the-fold>` to page layouts.

#### 🕸️ WebC templating

WebC 11ty plugin enabled by default and its use is encouraged. WebC provides a near vanilla HTML markup experience.

#### 💾 Example Sanity Data Fetching

`_data` folder with examples for bringing in data from a Sanity project. This example data is aligned to the schema used in the starter studio.

#### 📄 Example Content Generation

Full content pages and the main navigation are rendered on the site.

## ⚙️ Configuration

### 🎙️ Sanity Studio

#### 1️⃣ Create Sanity Project
A new Sanity project can be created within the Michigan Creative organization in the [Sanity web interface](https://www.sanity.io/manage). Creating the project will provide a **project ID** and **dataset** needed for configuring the studio and site.

#### 2️⃣ Generate Sanity API Token
A Sanity API token can be created in the web interface after the project is created: https://www.sanity.io/organizations/{organization-id}/project/{project-id}/api. The token needs to have the "Deploy Studio (Token only) permission". This token is used for deploying the studio with GitHub Actions and is used as the value in the `SANITY_AUTH_TOKEN` environment variable.

#### 3️⃣ Create Environment Configuration File

The following environment variables are required in both local and CI environments. Create a ```.env``` file and insert the following values to work locally. A `.env.example` file exists to reference the values.

```bash
SANITY_STUDIO_TITLE="any title you would like to display inside the studio"
SANITY_STUDIO_PROJECT_ID="project id from creating the project in step 1"
SANITY_STUDIO_DATASET="dataset from creating the project in step 1"
SANITY_AUTH_TOKEN="sanity api token generated in step 2"
```

#### 4️⃣ Generate GitHub Authorization Token

An authorization token from GitHub is needed to trigger site deploys when content changes in Sanity Studio. The token is a "fine-grained personal access token" and can be created here: https://github.com/settings/personal-access-tokens/new. These tokens do expire but can be set to last for one year. This token will be used in the next step when setting up a Sanity webhook. Important fields are:

- Expiration: `Custom` (1 year into the future is suggested)
- Resource owner: `m-creative-web`
- Repository access: `Only select repositories` (limit to project repo)
- Permissions
  - Repository permissions
    - Contents: `Read and write`
    - Metadata: `Read-only`

#### 5️⃣ Create Sanity Webhook

The second step to getting site builds from content changes working, is setting up a GROQ-powered webhook in the Sanity web interface: https://www.sanity.io/organizations/{organization-id}/project/{project-id}/api. Important fields are:

- URL: `https://api.github.com/repos/{repo-owner}/{repo-name}/dispatches`
- Dataset: `[dataset from step 1]`
- Trigger on: `Create` `Update` `Delete`
- Projection: `{"event_type":"sanity_publish"}`
- HTTP method: `POST`
- HTTP headers
  - `Accept`: `application/vnd.github+json`
  - `Authorization`: `Bearer [personal access token from GitHub]`
  - `X-GitHub-Api-Version`: `2022-11-28`


### 🌐 11ty site

Ensure the following environment variables are present in the ```.env``` file that was created in the previous steps:

```bash
SITE_URL="http://localhost:8080" # Used for setting absolute URLs for things like og-image
SANITY_STUDIO_PROJECT_ID="sanity-project-id"
SANITY_STUDIO_DATASET="sanity-project-dataset"
```

## 🔧 Development

These commands apply to both the studio and the site, but must be run for each. The applications work together but have independent dev environments and builds.

```bash
nvm use # Switch to appropriate Node version
npm install # Install dependencies
npm run dev # Run local server
```

## 🚀 Deploy

### 🎙️ Sanity Studio

The studio will deploy to sanity.io when changes are detected in the studio on a code push to the main branch.

The studio can also be manually deployed:

```bash
nvm use # Switch to appropriate Node version
npm ci # Install dependencies
npm run deploy # Deploy to sanity.io
```

### 🌐 11ty site

The 11ty site will deploy to GitHub Pages when code is pushed. Ensure Pages is enabled in the repository settings.

