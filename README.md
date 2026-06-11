# Meshach Ando Portfolio Website

This repository contains the source code for a minimalist, editorial-style portfolio website for Meshach Ando, hosted on GitHub Pages.

## Site Structure

- `index.html`: Main homepage
- `/water-resources/`: Water Resources and H&H portfolio path
- `/environmental/`: Environmental and Solid Waste portfolio path
- `/geotech/`: Geotechnical and Civil Field Engineering portfolio path
- `/research/`: Research portfolio path
- `/assets/`: Contains CSS, JS, images, and document files (resumes/CVs)

## How to Edit Text

All content is written in standard HTML. To update text:
1. Open the corresponding `index.html` file in a text editor (like VS Code or Notepad).
2. Locate the text you wish to change. The code is organized into logical `<section>` tags (e.g., `<section id="projects">`).
3. Replace the text within the HTML tags (like `<h1>`, `<p>`, `<h3>`) and save the file.
4. Commit and push the changes to GitHub to see them live.

## How to Replace Resume PDFs

Currently, placeholder PDFs are located in `assets/docs/`.
To update them with real files:
1. Name your actual PDF to match the placeholder exactly, for example: `Meshach_Ando_Full_CV.pdf`.
2. Place the new file in the `assets/docs/` folder, replacing the old file.
3. Commit and push the updated files to GitHub.

## How to Replace Image Placeholders

If you want to add images to the project cards or hero sections:
1. Save your images in `assets/images/placeholders/`.
2. Add an `<img>` tag in the HTML where you want the image to appear. For example: `<img src="../assets/images/placeholders/my-image.jpg" alt="Project image">`.

## How GitHub Pages Deployment Works

This site is designed to be hosted directly from this repository using GitHub Pages.
1. Push all files to the `main` branch of the `meshachando.github.io` repository.
2. In the GitHub repository, go to **Settings > Pages**.
3. Under "Build and deployment", ensure the Source is set to **Deploy from a branch**.
4. Set the branch to `main` and the folder to `/ (root)`.
5. Save the settings. Within a few minutes, the site will be live at `https://meshachando.github.io`.
