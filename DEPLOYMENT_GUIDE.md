# Deployment Guide: React Frontend (Vite)

This project has been migrated to **Vite** to improve performance and resolve security vulnerabilities found in the previous setup. 

## Important: Local Development vs. Production Hosting

### 1. Local Development
To run the project on your local machine:
```bash
npm install
npm run dev
```
This starts the development server. **Do NOT use this for production hosting.**

---

### 2. Production Hosting (How to host on a server)
To host this application on a web server or cloud platform (like Nginx, Apache, Netlify, Vercel, etc.):

#### Step A: Generate Build Files
Run the build command on your machine or in your CI/CD pipeline:
```bash
npm run build
```
This will create a folder named `dist` (replaces the old `build` folder).

#### Step B: Deploy the `dist` folder
1.  **Copy the contents of the `dist` folder** to your web server's root directory.
2.  **Configuration for Static Hosting**:
    - Since this is a Single Page Application (SPA), ensure your server is configured to redirect all requests to `index.html`.
    - **Nginx Example:**
      ```nginx
      location / {
          try_files $uri $uri/ /index.html;
      }
      ```
    - **Apache (.htaccess) Example:**
      ```apache
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
      ```

## Security Audit Results
The previous "High/Low" errors reported were vulnerabilities in the `react-scripts` build tool. By migrating to Vite, these have been resolved.

Run `npm audit` to verify the current security status.
